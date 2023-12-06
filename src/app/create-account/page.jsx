import React from "react";

import CreateAccountForm from "./form";
import createServerClient from "~/auth/createServerClient";
import getUser from "~/auth/getUser";

import { redirect } from "next/navigation"

/** @type { import("next").Metadata } */
export const metadata = {
    title: 'Create Account | BruinConnect',
}

export default async function CreateAccount(){
	const supabase = createServerClient();
	const user = await getUser(supabase);
	if(!user){
		redirect("/login");
	}
	else if(user.data && user.images.length > 0){
		redirect("/app");
	}

	return <CreateAccountForm images={user.images} {...user.data ? {
		firstName: user.data.FirstName,
		lastName: user.data.LastName,
		snap: user.data.Snap,
	} : {}}/>
}