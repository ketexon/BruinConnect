import createServerClient from "~/auth/createServerClient";
import getUser from "~/auth/getUser";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function POST(request){
	const formdata = await request.formData();
	/** @type {File | null} */
	const file = formdata.get("file");

	if(!file){
		return new Response(null, { status: 400 });
	}

	const supabase = createServerClient();

	const user = await getUser(supabase);
	if(!user){
		return new Response(null, { status: 401 });
	}

	const guid = crypto.randomUUID();
	const { data, error } = await supabase.storage.from("images").upload(guid, file)
	if(error){
		return new Response({
			error: error.error,
			message: error.message,
			path: null,
		}, { status: error.statusCode, statusText: error.error })
	}

	const { error: insertError } = await supabase.from("UserImages").insert({
		path: guid,
		user_id: user.auth.id,
	});

	return Response.json({
		error: null,
		message: null,
		...data
	}, {
		status: 201
	});
}