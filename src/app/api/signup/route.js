import createServerClient from "~/auth/createServerClient";
import origin from "~/origin";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function POST(request) {
	const supabase = createServerClient();

	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const repassword = formData.get("repassword");

	const emailRE = /^[a-zA-Z0-9_!.#$%&*+\/=?^\`\{\|\}~\-]+@(?:g\.)?ucla\.edu$/
	if(!emailRE.test(email)){
		return Response.redirect(`${origin}/signup?error=${encodeURIComponent("Invalid UCLA email")}`);
	}

	if(password.length < 6){
		return Response.redirect(`${origin}/signup?error=${encodeURIComponent("Password must be 6 or more characters")}`);
	}

	if(password !== repassword){
		return Response.redirect(`${origin}/signup?error=${encodeURIComponent("Passwords do not match")}`);
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		}
	});

	if(error){
		return Response.redirect(`${origin}/signup?error=${encodeURIComponent(error.message)}`);
	}

	return Response.redirect(`${origin}/signup?success=true`);
}