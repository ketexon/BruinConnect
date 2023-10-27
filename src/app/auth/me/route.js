import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextRequest}
 */
export async function GET(request){
	const requestUrl = new URL(request.url)
	const cookieStore = cookies()
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

	const { data, error } = await supabase.auth.getUser();
	const json = {};
	if(error){
		json.status = "not logged in";
	}
	else{
		json.status = "logged in";
		json.email = data.user.email;
	}

	return Response.json(json, {
		status: error ? 401 : 200
	})
}