import createServerClient from "~/auth/createServerClient"

import { NextRequest, NextResponse } from "next/server";
import { makeError, makeOk, BCAPIResult } from "../schema";

import { SwipeResult } from "./schema"
import getUser from "~/auth/getUser";

/**
 * @param {NextRequest} request
 * @returns {NextResponse<SwipeResult>}
 */
export async function POST(request){
	/** @type {FormData | null} */
	const formdata = await request.formData().catch(() => null);

	if(formdata === null) {
		return makeError("Could not parse body as formdata");
	}

	if(!formdata.has("other-id") || !formdata.has("direction")){
		return makeError("Body doesn't have required values")
	}

	const otherID = formdata.get("other-id");
	const direction = formdata.get("direction");

	if(direction !== "right" && direction !== "left"){
		return makeError("`direction` must be \"right\" or \"left\"");
	}

	const right = direction === "right";

	const supabase = createServerClient();
	const user = getUser(supabase);

	if(!user){
		return makeError("User not logged in", 401);
	}

	const { error } = await supabase.from("UserSwipes").insert({ other_id: otherID, right });

	if(error) {
		return makeError(error.message);
	}

	return makeOk(
		/** @type {SwipeResult} */ ({
		created: true,
	}))
}