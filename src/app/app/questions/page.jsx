import "server-only";
import Questions from "./component.jsx";
import getUser from "~/auth/getUser";


export default async function QuestionsPage () {
	const user = await getUser();

	return (
		<Questions user_id={user.auth.id} />
	)
}