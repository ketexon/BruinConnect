"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import Stack from "@mui/material/Stack";
import FormStatus from "~/components/FormStatus";

export default function UpdatePassword({ searchParams: { error, success, message } }){
	/** @type { import("react").MutableRefObject<HTMLInputElement> } */
	const passwordFieldRef = React.useRef(null);

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
		action="/api/update-password"
	>
		<Typography variant="h1" mb={4}>Update Password</Typography>
		{ error && <FormStatus type="error" message={error}/>}
		{ success && message && <FormStatus type="success" message={message}/>}
		<Stack direction="column" gap={2}>
			<Stack direction="column" gap={1}>
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
		</Stack>
	</Container>
}