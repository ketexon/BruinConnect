"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { redirect, useParams } from "next/navigation";
import { NextResponse } from "next/server";

export default function Login(){
	const params = useParams();
	const error = params.error;

	return <Container maxWidth="sm">
		<Box component="form" method="POST" action="/api/login"
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1
			}}
		>
			<TextField variant="outlined" required
				id="email" name="email" type="email"
				label="UCLA Email"
			/>
			<TextField variant="outlined" required
				id="password" name="password" type="password"
				label="Password"
				inputProps={{
					minLength: 6,
				}}
			/>
			<Button type="submit" variant="contained">Submit</Button>
		</Box>
	</Container>
}