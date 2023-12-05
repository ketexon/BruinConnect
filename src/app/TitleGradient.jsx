"use client";

import Typography from "@mui/material/Typography"
import React from "react";

const TRANSITION_DURATION = 100;
const TRANSITION_SPEED_PX_P_S = 50;

export default function TitleGradient(){
	const [offset, setOffset] = React.useState(0);

	const updateOffset = () => setOffset(offset => offset + TRANSITION_SPEED_PX_P_S * TRANSITION_DURATION / 1000)

	React.useEffect(() => {
		updateOffset()
	}, [])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			updateOffset()
		}, TRANSITION_DURATION);
		return () => {
			clearTimeout(timeout);
		}
	}, [offset])

	return <Typography component="h1" sx={theme => ({
			textAlign: "center",
			background: `linear-gradient(
				120deg,
				${theme.palette.primary.main} 0%,
				${theme.palette.secondary.main} 50%,
				${theme.palette.primary.main} 100%
			)`,
			transition: theme.transitions.create("background-position", {
				duration: `${TRANSITION_DURATION / 1000}s`,
				easing: "linear"
			}),
			backgroundClip: "text",
			color: "transparent",
			fontSize: "3rem",
			fontWeight: "bold",
		})}
		style={{
			backgroundPosition: `${offset}px`
		}}
	>
		Bruin Connect
	</Typography>
}