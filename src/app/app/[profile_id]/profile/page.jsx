import "server-only";
import ProfilePage from "./component.jsx";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient.js";
import getOtherUser from "~/auth/getOtherUser.js";


export default async function ({ params }) {
	const supabase = createServerClient();
	const user = await getUser(supabase);
	const otherUser = await getOtherUser(supabase, params.profile_id);

	return (
		<ProfilePage user={otherUser} editable={user.auth.id === params.profile_id} />
	)
}
