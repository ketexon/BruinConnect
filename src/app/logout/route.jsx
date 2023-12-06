import createServerClient from "~/auth/createServerClient"
import origin from "~/origin";

/**
 *
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function GET(request) {
	const supabase = createServerClient({ allowWriteCookies: true });
	await supabase.auth.signOut()

	return Response.redirect(`${origin}/`)
  }