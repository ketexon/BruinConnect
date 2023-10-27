import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 *
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export default function(){
	const cookieStore = cookies();
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: name => cookieStore.get(name)?.value,
				set: (name, value, options) => cookieStore.set({ name, value, ...options }),
				remove: (name, options) => cookieStore.delete({ name, ...options }),
			}
		}
	)
}