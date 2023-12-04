"use client";

import Container from "~/components/Container"
import Stack from "@mui/material/Stack"

import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"

import TitleGradient from "./TitleGradient"

import Link from "next/link"
import React from "react";
import HomeBackground from "./HomeBackground";

import Carousel from "react-material-ui-carousel"

const CAROUSEL_IMAGES = [
	{ img: "/home-carousel/1.jpg", objectPosition: "right" },
	{ img: "/home-carousel/2.jpg" },
]

/**
 * @param {Object} param0
 * @param {string | undefined} param0.img
 * @param {string | undefined} param0.objectPosition
 * @returns
 */
function CarouselItem({ img, objectPosition }){
	return <Paper sx={{
		width: "100%",
		height: "min-content",
		overflow: "clip",
	}}>
		{ img && <img src={img} alt="" draggable={false} style={{
			width: "100%",
			aspectRatio: "1",
			minWidth: "0",
			minHeight: "0",
			objectFit: "cover",
			objectPosition: objectPosition ?? "center",
		}}></img>}
	</Paper>
}

/**
 * @param {{ loggedIn: bool }} param0
 * @returns {React.ReactNode}
 */

export default function Home({ loggedIn }){


	return <Container sx={(theme) => ({
		minHeight: "100vh",
		pt: 4,
		position: "relative",
		overflow: "clip",
	})}>
		<TitleGradient/>
		<HomeBackground/>

		<Carousel
			swipe
			autoPlay
			sx={{
				alignSelf: "stretch",
				userSelect: "none",
				cursor: "pointer",
				mb: 2
			}}
			height={"fit-content"}
		>
			{CAROUSEL_IMAGES.map(entry => <CarouselItem key={entry.img} {...entry}/>)}
		</Carousel>

		<Stack direction="column" alignItems="center">
			<Stack alignItems="stretch" gap={1}>
				{!loggedIn && <><Button variant="outlined" size="large"
						component={Link}
						href="/login"
					>
						Login
					</Button>
					<Button variant="outlined" size="large"
						color="secondary"
						component={Link}
						href="/signup"
					>
						Signup
					</Button>
				</>
				}
				{loggedIn && <>
					<Button variant="outlined" size="large"
						component={Link}
						href="/app"
					>
						Go to App
					</Button>
				</>}
			</Stack>
		</Stack>
	</Container>
}