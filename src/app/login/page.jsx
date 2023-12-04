"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { redirect, useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import Stack from "@mui/material/Stack";

import { NextResponse } from "next/server";
import Link from "~/components/Link";

export default function Login(){
	const params = useParams();
	const error = params.error;

	return <Container
		sx={{ py: 2 }}
		component="form"
		method="POST"
		action="/api/login"
	>
		<Typography variant="h1" mb={4}>Login</Typography>
		<Stack direction="column" gap={2}>
			<Stack direction="column" gap={1}>
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
			</Stack>
			<Button
				type="submit"
				variant="contained"
				sx={{ alignSelf: "flex-start" }}
			>Submit</Button>
			<Stack direction="column" alignItems="flex-start">
				<Link href="/signup">Sign up</Link>
				<Link href="/reset-password">Reset password</Link>
			</Stack>
		</Stack>
	</Container>
}