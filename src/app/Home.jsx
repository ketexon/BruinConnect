"use client";

import Container from "~/components/Container"
import Stack from "@mui/material/Stack"

import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"

import TitleGradient from "./TitleGradient"

import Link from "next/link"
import React from "react";
import HomeBackground from "./HomeBackground";
import HomeCarousel from "./HomeCarousel";

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
		display: "flex",
		flexDirection: "column",
		gap: 4
	})}>
		<TitleGradient/>
		<HomeBackground/>
		<HomeCarousel/>

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