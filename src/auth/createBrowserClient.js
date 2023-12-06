import { createClient } from "@supabase/supabase-js";

/**
 *
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export default function(){
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			auth: {
				storage: {
					setItem: (key, value) => document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
					getItem: key => decodeURIComponent(document.cookie
									.split("; ")
									.find(line => line.startsWith(`${encodeURIComponent(key)}=`))
									?.substring(key.length + 1)
									?? null),
					removeItem: key => document.cookie = `${encodeURIComponent(key)}=; Max-Age=0`
				}
			}
		}
	)
}