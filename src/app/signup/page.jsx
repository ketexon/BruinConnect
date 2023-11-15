"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { redirect, useParams } from "next/navigation";
import { NextResponse } from "next/server";

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

	return <Container maxWidth="sm">
		<Box component="form" method="POST" action="/api/signup"
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 1
			}}
		>
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
			<Button type="submit" variant="contained">Submit</Button>
		</Box>
	</Container>
}