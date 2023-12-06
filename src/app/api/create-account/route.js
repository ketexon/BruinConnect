import { NextRequest, NextResponse } from "next/server"
import createServerClient from "~/auth/createServerClient"

import { ApiResponse, error, ok } from "../response"
import { CreateAccountResponse } from "./types"
import getUser from "~/auth/getUser";

/**
 * Returns 200 for if an accoutn is already made, or 201 if it is newly created
 * @param {NextRequest} req
 * @returns {NextResponse<ApiResponse<CreateAccountResponse>>}
 */
export async function POST(req){
	/** @type {FormData | null} */
	const formData = await req.formData().catch(e => null);

	if(!formData){
		return error("Could not read form data");
	}

	const firstName = formData.get("first-name")?.toString();
	const lastName = formData.get("last-name")?.toString();
	const snap = formData.get("snap")?.toString();

	if(!firstName || !lastName || !snap){
		return error("Required fields missing from form data");
	}

	const supabase = createServerClient({ allowWriteCookies: true });

	const user = await getUser(supabase);

	if(!user){
		return error("Unauthenticated", 401);
	}

	if(user.data) {
		return ok(true, 200);
	}

	const { error: postgresError } = await supabase.from("Users").insert({
		UserUID: user.auth.id,
		FirstName: firstName,
		LastName: lastName,
		Snap: snap
	});

	if(postgresError){
		return error(`Database Error: ${postgresError.code}`);
	}

	return ok(true, 201);
}