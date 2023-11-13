import { createClient } from "@supabase/supabase-js";

/**
 *
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export default function(){
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	)
}