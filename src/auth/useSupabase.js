import React from "react";

import { SupabaseClient } from "@supabase/supabase-js"
import createBrowserClient from "./createBrowserClient";

export default function useSupabase(){
	const [supabase, setSupabase] = React.useState(/** @type {SupabaseClient | null} */ (null));

	React.useEffect(() => {
		setSupabase(createBrowserClient());
	}, [])

	return supabase;
}