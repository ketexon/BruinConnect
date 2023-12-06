import "server-only";
import createServerClient from "~/auth/createServerClient.js";
import getUser from "~/auth/getUser";
import getMatches from "./matching";
import SwipePage from "./component";

/**
 * @type {import("next").Metadata}
 */
export const metadata = {
	title: "Swipe | BruinConnect"
}

export default async function Swipe(){
	const supabase = createServerClient();
	const user = await getUser(supabase);
	const similar_users = await getMatches(user.auth.id);

	return <SwipePage similar_users={similar_users} userId={user.auth.id}/>
}