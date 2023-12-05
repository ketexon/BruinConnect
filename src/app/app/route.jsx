import { NextRequest, NextResponse } from "next/server"
import origin from "~/origin";

/**
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export function GET(req){
	console.log('BRUINCONNECT LOG:', origin);
	console.log('BRUINCONNECT LOG:', process.env.URL);
	console.log('BRUINCONNECT LOG:', process.env.DEPLOY_URL);
	return NextResponse.redirect(`${origin}/app/swipe`, {
		status: 308
	})
}