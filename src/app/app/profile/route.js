import { NextRequest, NextResponse } from "next/server"

import createServerClient from "~/auth/createServerClient"
import getUser from "~/auth/getUser";

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function GET(req){
	const res = new NextResponse();
	const supabase = createServerClient({ req, res });
	const user = await getUser(supabase);
	return NextResponse.redirect(`${req.nextUrl.origin}/app/${user.data.UserUID}/profile`, {
		status: 307
	})
}