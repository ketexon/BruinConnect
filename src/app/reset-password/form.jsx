"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import Stack from "@mui/material/Stack";

import { NextResponse } from "next/server";
import Link from "~/components/Link";
import FormStatus from "~/components/FormStatus";

export default function ResetPassword({ searchParams: { error, success } }){
	return <Container
		sx={{ py: 2 }}
		component="form"
		method="POST"
		action="/api/reset-password"
	>
		<Typography variant="h1" mb={4}>Reset Password</Typography>
		{ error && <FormStatus type="error" message={error}/>}
		{ success && <FormStatus type="success" message={"Please check your email."}/>}
		<Stack direction="column" gap={2}>
			<Stack direction="column" gap={1}>
				<FormControl>
					<TextField variant="outlined" required
						id="email" name="email" type="email"
						label="Email"
						sx={{ width: "100%" }}
					/>
					{error && <FormHelperText error>
						{error}
					</FormHelperText>}
				</FormControl>
			</Stack>
			<Button
				type="submit"
				variant="contained"
				sx={{ alignSelf: "flex-start" }}
			>Submit</Button>
			<Stack direction="column" alignItems="flex-start">
				<Link href="/login">Log in</Link>
				<Link href="/signup">Sign up</Link>
			</Stack>
		</Stack>
	</Container>
}