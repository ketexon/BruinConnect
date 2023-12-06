import "server-only";

/** @type {import("next").Metadata} */
import createServerClient from "~/auth/createServerClient.js";
import Matches from "./connections"
import fetchMatches from "./fetchMatches";

export const metadata = {
    title: 'BruinConnect | Matches',
}

export default async function() {
    const supabase = createServerClient();
    const matchData = await fetchMatches(supabase);

	return <Matches initialMatchData={matchData} />
}
