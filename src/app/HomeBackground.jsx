"use client";

import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box"


const GRADIENT_COLORS = [
	"rgba(236,64,122,0.15)",
	"rgba(244,67,54,0.15)",
]

const GRADIENT_MIN_OPACITY = 0.5;

function makeGradient(position, colorIndex, sizePercent){
	return `radial-gradient(circle at ${position}, ${GRADIENT_COLORS[colorIndex]} 0%, rgba(0,0,0,0) ${sizePercent}%, rgba(0,0,0,0) 100%)`
}

const GRADIENT_CHANGE_INTERVAL = 5000;

export default function HomeBackground(){
	const theme = useTheme();
	const gradientTransition = theme.transitions.create("opacity", {
		duration: `${GRADIENT_CHANGE_INTERVAL / 1000}s`,
		easing: theme.transitions.easing.easeInOut,
	});

	const [gradientToggle, setGradientToggle] = React.useState(false)

	const toggleGradient = () => setGradientToggle(t => !t);

	React.useEffect(() => {
		toggleGradient();
	}, [])

	React.useEffect(() => {
		const interval = setTimeout(toggleGradient, GRADIENT_CHANGE_INTERVAL);
		return () => {
			clearInterval(interval);
		}
	}, [gradientToggle])

	return <>
		<Box sx={{
			position: "absolute",
			top: 0, left: 0,
			width: "100%",
			aspectRatio: "0.33",
			display: "grid",
			gridTemplate: "1fr / 1fr",
			pointerEvents: "none",
		}}>
			<Box sx={{
					gridRowStart: "1",
					gridColumnStart: "1",
					background: makeGradient("top left", 0, 25),
					transition: gradientTransition,
				}}
				style={{
					opacity: gradientToggle ? GRADIENT_MIN_OPACITY : 1,
				}}
			/>
		</Box>
		<Box sx={{
			position: "absolute",
			top: 0, left: 0,
			width: "100%",
			aspectRatio: "0.5",
			display: "grid",
			gridTemplate: "1fr / 1fr",
			pointerEvents: "none",
		}}>
			<Box sx={{
					gridRowStart: "1",
					gridColumnStart: "1",
					background: makeGradient("center right", 1, 50),
					transition: gradientTransition,
				}}
				style={{
					opacity: gradientToggle ? 1 : GRADIENT_MIN_OPACITY,
				}}
			/>
		</Box>
	</>
}