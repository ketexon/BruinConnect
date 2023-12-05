import { NextRequest, NextResponse } from "next/server"
import origin from "~/origin";

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export function GET(req){
	return NextResponse.redirect(`${process.env.URL}/app/swipe`, {
		status: 308
	})
}