"use client";

import * as React from "react";
import createBrowserClient from "~/auth/createBrowserClient";

import Button, { ButtonProps } from "@mui/material/Button"

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
				onFileUploadError(message);
			}
			else{
				onFileUpload(path);
			}
		}).catch((error) => {
			onFileUploadError(error);
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
	</>
}