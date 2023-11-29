import "server-only";
import Typography from "@mui/material/Typography";

import Container from "~/components/Container";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient";

export default async function Swipe(){
	const supabase = createServerClient();
	const user = await getUser(supabase);

	return <Container>
		<Typography variant="body1">Email: {user.auth.email}</Typography>
	</Container>
}