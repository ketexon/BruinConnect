import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
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

	await supabase.auth.signInWithPassword({
		email,
		password,
	})

	return Response.redirect(`${origin}/`)
}