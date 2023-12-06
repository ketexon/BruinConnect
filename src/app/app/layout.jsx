import "server-only";

import Nav from "./components/Nav"
import { redirect } from "next/navigation";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient";
import Appbar from "./components/AppBar";
import Container from "~/components/Container";

export const metadata = {
    title: 'BruinConnect',
}

export default async function AppLayout({ children }) {
    const supabase = createServerClient();
    const user = await getUser(supabase);
    if (user === null) {
        redirect("/login");
    }
    if(user.data === null || user.images.length === 0){
        redirect("/create-account");
    }

    return (
        <Container sx={{ padding: 0 }}>
            <Appbar/>
            {children}
            <Nav />
        </Container>
    )
}
