import * as React from "react";
import { User as SupabaseUser, SupabaseClient } from "@supabase/supabase-js"

/**
 * @typedef {Object} User
 * @property {SupabaseUser} auth
 * @property {{ UserUID: string, FirstName: string, LastName: string, Snap: string, description: string } | null} data
 * @property {string[]} images
 */

/**
 * @type {(SupabaseClient) => Promise<User | null>}
 */
const getUser = React.cache(
	/**
	 * @param {SupabaseClient} supabase
	 * @returns {Promis<User | null>}
	 */
	async (supabase) => {
		const { data: { user } } = await supabase.auth.getUser();
		/** @type {User} */
		if(!user) {
			console.log("User not logged in");
			return null;
		}

		const userData = await supabase
			.from("Users")
			.select("*")
			.eq("UserUID", user.id)
			.maybeSingle();

		const userImages = (await supabase
			.from("UserImages")
			.select("path")
			.eq("user_id", user.id))
			.data;

		return {
			auth: user,
			data: userData.data,
			images: userImages.map(({ path }) => supabase.storage.from("images").getPublicUrl(path).data.publicUrl),
		}
	}
);

export default getUser;