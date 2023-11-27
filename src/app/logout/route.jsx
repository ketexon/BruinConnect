import createServerClient from "~/auth/createServerClient"

/**
 *
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function GET(request) {
	const { origin } = request.nextUrl;

	const supabase = createServerClient();
	await supabase.auth.signOut()

	return Response.redirect(`${origin}/`)
  }