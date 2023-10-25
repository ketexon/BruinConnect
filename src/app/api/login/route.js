import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 * @returns {import("next/server").NextResponse}
 */
export async function POST(request) {
	const requestUrl = new URL(request.url);
	const { origin } = request.nextUrl;
	return Response.redirect(`${origin}/`);
}