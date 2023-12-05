import { NextRequest, NextResponse } from "next/server"

import createServerClient from "~/auth/createServerClient"
import getUser from "~/auth/getUser";
import origin from "~/origin";

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function GET(req){
	const res = new NextResponse();
	const supabase = createServerClient({ req, res });
	const user = await getUser(supabase);
	return NextResponse.redirect(`${origin}/app/${user.data.UserUID}/profile`, {
		status: 307
	})
}