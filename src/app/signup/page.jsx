"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import Stack from "@mui/material/Stack";

import { redirect, useParams } from "next/navigation";

import Link from "~/components/Link";

export default function Signup(){
	const params = useParams();
	const error = params.error;

	/** @type { import("react").MutableRefObject<HTMLInputElement> } */
	const passwordFieldRef = React.useRef(null);

	/**
	 * @param {import("react").FormEvent<HTMLDivElement>} e
	 */
	function onEmailInput(e){
		/** @type {HTMLInputElement} */
		const email = e.target;
		if(email.validity.patternMismatch) {
			email.setCustomValidity("Must be a UCLA Email Address");
		}
		else{
			email.setCustomValidity("");
		}
	}

	/**
	 * @param {import("react").FormEvent<HTMLDivElement>} e
	 */
	function onRepasswordInput(e){
		/** @type {HTMLInputElement} */
		const repwd = e.target;
		if(passwordFieldRef.current && repwd.value !== passwordFieldRef.current.value) {
			repwd.setCustomValidity("Password does not match.");
		}
		else{
			repwd.setCustomValidity("");
		}
	}

	return <Container
		sx={{ py: 2 }}
		component="form"
		method="POST"
		action="/api/signup"
	>
		<Typography variant="h1" mb={4}>Sign Up</Typography>
		<Stack direction="column" gap={2}>
			<Stack direction="column" gap={1}>
				<TextField variant="outlined" required
					id="email" name="email" type="email"
					label="UCLA Email"
					inputProps={{
						pattern: String.raw`^[a-zA-Z0-9_!.#$%&*+\/=?^\`\{\|\}~\-]+@(?:g\.)?ucla\.edu$`,
						onInput: onEmailInput
					}}
				/>
				<TextField variant="outlined" required
					id="password" name="password" type="password"
					label="Password"
					inputRef={passwordFieldRef}
					inputProps={{
						minLength: 6,
					}}
				/>
				<TextField variant="outlined" required
					id="repassword" name="repassword" type="password"
					label="Re-enter Password"
					inputProps={{
						onInput: onRepasswordInput
					}}
				/>
			</Stack>
			<Button
				type="submit"
				variant="contained"
				sx={{ alignSelf: "flex-start" }}
			>Submit</Button>
			<Stack direction="column" alignItems="flex-start">
				<Link href="/login">Login</Link>
			</Stack>
		</Stack>
	</Container>
}