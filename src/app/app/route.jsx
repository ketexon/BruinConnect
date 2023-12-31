import { NextRequest, NextResponse } from "next/server"
import origin from "~/origin";

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export function GET(req){
	return NextResponse.redirect(`${origin}/app/swipe`, {
		status: 308
	})
}