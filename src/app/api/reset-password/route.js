import createServerClient from "~/auth/createServerClient"
import origin from "~/origin";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextRequest}
 */
export async function POST(request){
	const supabase = createServerClient({ allowWriteCookies: true });

	const formData = await request.formData();
	const email = formData.get("email");

	if(!email){
		return Response.redirect(`${origin}/reset-password`);
	}

	const { error } = await supabase.auth.resetPasswordForEmail(
		email,
		{
			redirectTo: `${origin}/api/auth/callback?next=${origin}/update-password`
		}
	)

	if(error) {
		return Response.redirect(`${origin}/reset-password?error=${error.message}`)
	}

	return Response.redirect(`${origin}/reset-password?success=true`)
}