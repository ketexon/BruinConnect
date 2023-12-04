import "server-only";

/** @type {import("next").Metadata} */
import createServerClient from "~/auth/createServerClient.js";
import getUser from "~/auth/getUser";

import TextField from "@mui/material/TextField"

import Matches from "./Matches"
import getOtherUser from "~/auth/getOtherUser";

export const metadata = {
    title: 'BruinConnect | Matches',
}

export default async function() {
    const supabase = createServerClient();
	const user = await getUser(supabase);
    const user_id = user.auth.id;

    const { data: user_liked_data } = await supabase.from('UserSwipes').select('*').eq('user_id', user_id).eq('right', true);
    const { data: liked_user_data } = await supabase.from('UserSwipes').select('*').eq('other_id', user_id).eq('right', true);

    let user_liked = new Set();
    user_liked_data.forEach(like => user_liked.add(like.other_id));

    let matches = [];
    for (const like of liked_user_data) {
        if (user_liked.has(like.user_id)) {
            matches.push(like.user_id);
        }
    }

    const matchData = await Promise.all(
        matches
            .map(other_id => getOtherUser(supabase, other_id)
        )
    );


	return <Matches matchData={matchData} />
}
