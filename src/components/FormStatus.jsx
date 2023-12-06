import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import React from "react"

/**
 * @param {Object} param0
 * @param {string} param0.message
 * @param {string} param0.title
 * @param {"success" | "error" | undefined} param0.type
 * @returns {React.ReactNode}
 */
export default function FormStatus({ message, title, type }) {
	type ??= "success";
	title ??= type === "success" ? "Success" : "Error";

	return <Alert color={type} sx={{ mb: 2 }}>
		<AlertTitle>{title}</AlertTitle>
		{message}
	</Alert>
}