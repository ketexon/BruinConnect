"use client";

import React from "react";
import { BCAPIResult } from "~/app/api/schema"
import { SwipeResult } from "~/app/api/swipe/schema"
import createBrowserClient from "~/auth/createBrowserClient";
import getUnswipedUser from "./getUnswipedUser";

export default function Swipe(){
	const supabase = createBrowserClient();

	const [swipingUser, setSwipingUser] = React.useState(null);

	const selectNewSwipingUser = () => {
		getUnswipedUser(supabase).then((v) => {
			console.log(v);
			setSwipingUser(v);
		});
	}

	React.useEffect(() => {
		selectNewSwipingUser();
	}, [])

	const swipe = (direction) => () => {

	}

	return <div>
		{swipingUser && (
			<div>
				{swipingUser.FirstName} {swipingUser.LastName}
			</div>
		)}
		<button onClick={swipe("left")}>Left</button>
		<button onClick={swipe("right")}>Right</button>
	</div>
}