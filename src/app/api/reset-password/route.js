import createServerClient from "~/auth/createServerClient"

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextRequest}
 */
export async function POST(request){
	const { origin } = request.nextUrl;
	const supabase = createServerClient();

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