import { NextRequest, NextResponse } from "next/server"

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export function GET(req){
	console.log("BRUINCONNECT LOG:", req.nextUrl.origin);
	return NextResponse.redirect(`${req.nextUrl.origin}/app/swipe`, {
		status: 308
	})
}