import createServerClient from "~/auth/createServerClient"

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextRequest}
 */
export async function POST(request) {
	const { origin } = request.nextUrl;
	const supabase = createServerClient();

	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if(error) {
		return Response.redirect(`${origin}/login?error=${error.message}`)
	}

	return Response.redirect(`${origin}/app`)
}