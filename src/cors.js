import { NextRequest, NextResponse } from "next/server"

/**
 *
 * @param {NextRequest} req
 * @param {NextResponse} res
 * @returns {Promise<NextResponse>}
 */
export default async function(req, res){
	res.headers.set("Access-Control-Allow-Origin", "*");
	res.headers.set("Access-Control-Allow-Method", "GET, POST");
	res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
	return res;
}