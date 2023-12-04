import createServerClient from "~/auth/createServerClient";
import getUser from "~/auth/getUser";

import { ApiResponse, error, ok } from "../response"
import { UploadResponse } from "./types"

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse<ApiResponse<UploadResponse>>}
 */
export async function POST(request){
	const formdata = await request.formData();
	/** @type {File | null} */
	const file = formdata.get("file");

	if(!file){
		return error("Form data missing required fields");
	}

	const supabase = createServerClient();

	const user = await getUser(supabase);
	if(!user){
		return error("Unauthenticated", 401);
	}

	const guid = crypto.randomUUID();

	const { data, error: uploadError } = await supabase.storage.from("images").upload(guid, file)
	if(uploadError){
		return error(uploadError.message, { status: uploadError.statusCode })
	}

	const { error: insertError } = await supabase.from("UserImages").insert({
		path: guid,
		user_id: user.auth.id,
	});

	if(insertError){
		await supabase.storage.from("images").remove(["guid"]);
		return error(insertError.code, 500);
	}

	const { data: selectData } = await supabase.from("UserImages")
		.select("path")
		.eq("user_id", user.auth.id)
		.neq("path", guid);

	const imageDeleteResponse = await supabase.storage.from("images")
		.remove(selectData.map(({ path }) => `${path}.jpg`));


	console.log(selectData.map(({ path }) => `${path}`));
	console.log(imageDeleteResponse);

	// Only delete from userimages if deleted from storage
	// Also note that this could cause a race condition where if a user uploads two images
	// then the former might be deleted withotu being deleted from images
	if(!imageDeleteResponse.error){
		const {} = await supabase.from("UserImages")
			.delete()
			.eq("user_id", user.auth.id)
			.neq("path", guid);
	}

	return ok(guid, 201);
}