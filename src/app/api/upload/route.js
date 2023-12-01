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

	return ok(guid, 201);
}