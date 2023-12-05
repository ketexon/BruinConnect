import * as React from "react";
import { User as SupabaseUser, SupabaseClient } from "@supabase/supabase-js"
import { User } from "./getUser"

/**
 * @typedef {Omit<import("~/auth/getUser").User, "auth">} OtherUser
 */

/**
 * @param {SupabaseClient} supabase
 * @param {string} userID
 * @returns {Promis<OtherUser | null>}
 */
export default async function(supabase, userID) {
	const userData = await supabase
		.from("Users")
		.select("*")
		.eq("UserUID", userID)
		.maybeSingle();

	const userImages = (await supabase
		.from("UserImages")
		.select("path")
		.eq("user_id", userID))
		.data;

	return {
		data: userData.data,
		images: userImages.map(({ path }) => supabase.storage.from("images").getPublicUrl(path).data.publicUrl),
	}
}