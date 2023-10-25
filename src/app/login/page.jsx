import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default function Login(){
	return <form method="POST" action="/api/login">
		<TextField id="email" variant="outlined" label="Email" />
		<Button type="submit">Submit</Button>
	</form>
}