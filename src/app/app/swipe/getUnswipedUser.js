import { SupabaseClient } from "@supabase/supabase-js"

/**
 * @param {SupabaseClient} supabase
 * @returns {Promise<Object | null>}
 */
export default async function getUnswipedUser(supabase){
	const row = await supabase.from("unswiped_users").select("*, UserImages(*)").maybeSingle();
	if(!row.error){
		return row.data;
	}
	return null;
}