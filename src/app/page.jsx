import createServerClient from "~/auth/createServerClient"
import Home from "./Home"
import getUser from "~/auth/getUser";
/** @type {import("next").Metadata} */
export const metadata = {
	title: "BruinConnect",
}

export default async function (){
	const supabase = createServerClient();
	const user = await getUser(supabase);

	return <Home loggedIn={user !== null} />
}