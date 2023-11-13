import "server-only";
import * as React from "react";
import createServerClient from "./createServerClient";
import { User as SupabaseUser, UserIdentity } from "@supabase/supabase-js"

/**
 * @typedef {Object} User
 * @property {SupabaseUser} auth
 * @property {{ UserUID: string, FirstName?: string, LastName?: string }} data
 */

/**
 * @type {() => Promise<User | null>}
 */
const getUser = React.cache(async () => {
	const supabase = createServerClient();
	const { data: { user } } = await supabase.auth.getUser();
	/** @type {User} */
	if(!user) return null;

	const userData = await supabase
		.from("Users")
		.select("*")
		.maybeSingle();

	return {
		auth: user,
		data: userData.data
	}
});

export default getUser;