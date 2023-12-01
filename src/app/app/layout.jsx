import "server-only";

import Nav from "./components/Nav"
import { redirect } from "next/navigation";
import getUser from "~/auth/getUser";
import createServerClient from "~/auth/createServerClient";

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
        <>
            <Nav />
            {children}
        </>
    )
}
