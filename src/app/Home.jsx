"use client";

import Container from "~/components/Container"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import Button from "@mui/material/Button"

import TitleGradient from "./TitleGradient"

import Link from "next/link"
import React from "react";

/**
 * @param {{ loggedIn: bool }} param0
 * @returns {React.ReactNode}
 */

export default function Home({ loggedIn }){
	return <Container sx={(theme) => ({
		minHeight: "100vh",
		pt: 4
	})}>
		<TitleGradient/>
		<Box sx={{
			position: "absolute",
			top: 0, left: 0,
			width: "100%",
			aspectRatio: "0.33",
			background: `radial-gradient(circle at top left, rgba(236,64,122,0.20) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 100%);`,
		}}/>
		<Box sx={{
			position: "absolute",
			top: 0, left: 0,
			width: "100%",
			aspectRatio: "0.33",
			background: `radial-gradient(circle at center right, rgba(244,67,54,0.20) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%);`,
			backgroundSize: "contain",
			backgroundRepeat: "no-repeat",
		}}/>
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