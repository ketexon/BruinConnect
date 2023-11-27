"use client";

import * as React from "react";
import createBrowserClient from "~/auth/createBrowserClient";

import Button, { ButtonProps } from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import Alert from '@mui/material/Alert';

/**
 * @typedef {Object} ImageUploadProps
 * @property {((path: string) => void) | ((path: string) => Promise<void>)} onFileUpload
 * @property {((message: string) => void) | ((message: string) => Promise<void>) | null} onFileUploadError
 * @property {Omit<ButtonProps, "onClick" | "type"> | null} buttonProps
 */

/**
 * @param {ImageUploadProps} param0
 * @returns {React.ReactElement}
 */

export default function ImageUpload({ onFileUpload, onFileUploadError, buttonProps }){
	/**
	 * @type {React.MutableRefObject<HTMLInputElement | null>}
	 */
	const fileInputRef = React.useRef(null);

	const [snackbarMessage, setSnackbarMessage] = React.useState(null);
	const onSnackbarClose = () => {
		setSnackbarMessage(null);
	}

	/**
	 * @param {string} message
	 */
	const onError = (message) => {
		if(onFileUploadError) {
			onFileUploadError(message);
		}
		setSnackbarMessage(message);
	}

	/** @type {React.ChangeEventHandler<HTMLInputElement>} */
	const onFileChanged = (e) => {
		if(!e.target.files) {
			return;
		}

		const formdata = new FormData();
		formdata.set("file", e.target.files?.[0])
		fetch(`${window.location.origin}/api/upload`, {
			method: "POST",
			body: formdata,
		}).then(async res => {
			return res.json();
		}).then(({ path, error, message }) => {
			if(error){
				onError(message);
			}
			else{
				onFileUpload(path);
			}
		}).catch((error) => {
			onError(error);
		})
	}
	return <>
		<input hidden
			type="file"
			ref={fileInputRef}
			onChange={onFileChanged}
			accept="image/*"
		/>
		<Button
			onClick={() => {fileInputRef.current.click();}}
			type="button" {...buttonProps ?? {}}
		>Upload file</Button>
		<Snackbar
			open={snackbarMessage !== null}
			autoHideDuration={5000}
			onClose={onSnackbarClose}
		>
			<Alert severity="error" autoHideDuration={5000} onClose={onSnackbarClose}>
				{snackbarMessage.toString()}
			</Alert>
		</Snackbar>
	</>
}