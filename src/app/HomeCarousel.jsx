"use client";

import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"

import Carousel from "react-material-ui-carousel"
import React from "react";

import { pink } from "@mui/material/colors"

const CAROUSEL_IMAGES = [
	{ img: "/home-carousel/1.jpg", objectPosition: "right" },
	{ img: "/home-carousel/2.jpg" },
	{ img: "/home-carousel/3.jpg" },
	{ img: "/home-carousel/4.jpg" },
]

/**
 * @param {Object} param0
 * @param {string | undefined} param0.img
 * @param {string | undefined} param0.objectPosition
 * @returns
 */
function CarouselItem({ img, objectPosition }){
	return <Paper
		sx={{
			width: "100%",
			height: "min-content",
			overflow: "clip",
			aspectRatio: 1,
			display: "grid",
			gridTemplate: "1fr / 1fr",
			padding: 2
		}}
	>
		<Box sx={theme => ({
			gridRowStart: 1,
			gridColumnStart: 1,
			backgroundColor: theme.palette.secondary.main,
			opacity: "0.30",
			zIndex: 2,
		})} />
		<img src={img} alt="" draggable={false} style={{
			width: "100%",
			height: "100%",
			minWidth: "0",
			minHeight: "0",
			objectFit: "cover",
			objectPosition: objectPosition ?? "center",
			filter: "grayscale(80%)",
			gridRowStart: 1,
			gridColumnStart: 1,
		}}></img>
	</Paper>
}

const INTERVAL = 10000

export default function HomeCarousel(){
	const [ticks, setTicks] = React.useState(0);
	const image = React.useMemo(() => ticks % CAROUSEL_IMAGES.length, [ticks])


	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setTicks(ticks + 1);
		}, INTERVAL);
		() => {
			clearTimeout(timeout);
		}
	}, [ticks])

	return <Box sx={{
		overflow: "visible"
	}}>
		<Box sx={theme => ({
				width: `${CAROUSEL_IMAGES.length * 100}%`,
				maxWidth: "none",
				display: "flex",
				flexDirection: "row",
				transition: theme.transitions.create("margin-left", {
					duration: theme.transitions.duration.short,
					easing: theme.transitions.easing.easeInOut
				})
			})}
			style={{ marginLeft: `${-image * 100}%` }}
		>
			{CAROUSEL_IMAGES.map(entry => <CarouselItem key={entry.img} {...entry}/>)}
		</Box>
	</Box>
}