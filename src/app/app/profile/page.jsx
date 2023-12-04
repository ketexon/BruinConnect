import { redirect } from "next/navigation"
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient.js";

export default async function Profile() {
	const supabase = createServerClient();
	const user = await getUser(supabase);
	redirect(`/app/${user.auth.id}/profile`);
}
