import "server-only";
import getUser from "~/auth/getUser";
import getMatches from "./matching"


export default async function Swipe(){
	const user = await getUser();
	const similarities = await getMatches(user.auth.id);
	console.log(similarities);

	return <div>Swipe</div>
}