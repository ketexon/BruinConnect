import "server-only";
import createServerClient from "~/auth/createServerClient.js";
import getUser from "~/auth/getUser";
import getMatches from "./matching"


export default async function Swipe(){
	const supabase = createServerClient();
	const user = await getUser(supabase);
	const similarities = await getMatches(user.auth.id);
	console.log(similarities);

	return <div>Swipe</div>
}