import * as React from "react";
import { User as SupabaseUser, SupabaseClient } from "@supabase/supabase-js"

/**
 * @typedef {Object} User
 * @property {SupabaseUser} auth
 * @property {{ UserUID: string, FirstName?: string, LastName?: string }} data
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
			.maybeSingle();

		return {
			auth: user,
			data: userData.data
		}
	}
);

export default getUser;