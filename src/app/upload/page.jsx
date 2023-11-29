"use client";
import { SupabaseClient } from "@supabase/supabase-js";
import * as React from "react";

import getUser from "~/auth/getUser";
import createBrowserClient from "~/auth/createBrowserClient";
import ImageUpload from "~/components/ImageUpload";

export default function(){
	/** @type {string | null} */
	const [imgUrl, setImgUrl] = React.useState(null);

	/** @type {React.MutableRefObject<SupabaseClient>} */
	const supabase = React.useRef();

	/** @type {React.MutableRefObject<import("~/auth/getUser").User>} */
	const userRef = React.useRef();

	React.useEffect(() => {
		supabase.current = createBrowserClient();
		userRef.current = getUser(supabase.current)
	}, []);

	const onFileUpload = async (path) => {
		const url = supabase.current.storage.from("images").getPublicUrl(path).data.publicUrl;
	}

	return <>
		<ImageUpload
			onFileUpload={onFileUpload}
			onFileUploadError={(error) => { console.error(error); }}/>
		<img src={imgUrl} />
	</>
}