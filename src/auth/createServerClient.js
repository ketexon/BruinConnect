import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @typedef {Object} CreateServerClientOptions
 * @property {NextRequest} req
 * @property {NextResponse} res
 * @property {boolean | undefined} allowWriteCookies
 */

/**
 * @param {CreateServerClientOptions | undefined} options
 * @returns {import("@supabase/supabase-js").SupabaseClient}
 */
export default function(options){
	const req = options?.req
	const res = options?.res
	const allowWriteCookies = options?.allowWriteCookies ?? false
	if(res && req){
		return createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					get: name => req.cookies.get(name)?.value,
					set: (name, value, options) => res.cookies.set({ name, value, ...options }),
					remove: (name, options) => res.cookies.delete({ name, ...options }),
				}
			}
		)
	}
	else {
		const cookieStore = cookies();
		return createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					get: name => cookieStore.get(name)?.value,
					...(allowWriteCookies || true) ? {
						set: (name, value, options) => cookieStore.set({ name, value, ...options }),
						remove: (name, options) => cookieStore.delete({ name, ...options }),
					} : {
						set: () => {},
						remove: () => {},
					}
				}
			}
		)
	}
}