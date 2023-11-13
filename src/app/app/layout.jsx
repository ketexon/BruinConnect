import "server-only";

import Nav from "./components/Nav"
import { redirect } from "next/navigation";
import getUser from "~/auth/getUser";

export const metadata = {
    title: 'BruinConnect',
}

export default async function AppLayout({ children }) {
    const user = getUser();
    if (user === null) {
        redirect("/login");
    }
    return (
        <>
            <Nav />
            {children}
        </>
    )
}
