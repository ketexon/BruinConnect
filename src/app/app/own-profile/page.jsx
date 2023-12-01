import "server-only";
import ProfilePage from "./component.jsx";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient.js";


export default async function () {
	const supabase = createServerClient();
	const user = await getUser(supabase);

	return (
		<ProfilePage user_id={user.auth.id} />
	)
}
