import createServerClient from "~/auth/createServerClient";
import origin from "~/origin";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function POST(request) {
	const supabase = createServerClient();

	const formData = await request.formData();
	const password = formData.get("password");
	const repassword = formData.get("repassword");

	if(password.length < 6){
		return Response.redirect(
			`${origin}/update-password?error=${encodeURIComponent("Password must be at least 6 characters.")}`
		);
	}

	if(password !== repassword){
		return Response.redirect(
			`${origin}/signup?e=repassword${encodeURIComponent("Passwords do not match")}`
		);
	}

	const { error } = await supabase.auth.updateUser({ password });

	if(error){
		return Response.redirect(`${origin}/update-password?error=${error.message}`);
	}

	return Response.redirect(`${origin}/login?success=true&message=${encodeURIComponent("Successfully reset password.")}`);
}