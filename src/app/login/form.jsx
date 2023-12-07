"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import { redirect, useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import Stack from "@mui/material/Stack";
import FormStatus from "~/components/FormStatus";


import { NextResponse } from "next/server";
import Link from "~/components/Link";

export default function Login({ searchParams: { error, success, message } }){
	const [hashError, setHashError] = React.useState(null);

	React.useEffect(() => {
		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		if(hashParams.has("error")) {
			setHashError(hashParams.get("error_description") ?? "Unknown external error");
		}
	}, [])

	return <Container
		sx={{ py: 2 }}
		component="form"
		method="POST"
		action="/api/login"
	>
		<Typography variant="h1" mb={4}>Login</Typography>
		{ error && <FormStatus type="error" message={error}/>}
		{ hashError && <FormStatus type="error" message={hashError}/>}
		{ success && <FormStatus type="success" message={message}/>}
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
					sx={{ width: "100%" }}
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