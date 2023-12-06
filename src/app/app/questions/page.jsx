import "server-only";
import Questions from "./component.jsx";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient.js";

/**
 * @type {import("next").Metadata}
 */
export const metadata = {
	title: "Questions | BruinConnect"
}

export default async function QuestionsPage () {
	const supabase = createServerClient();
	const user = await getUser(supabase);

	return (
		<Questions user_id={user.auth.id} />
	)
}