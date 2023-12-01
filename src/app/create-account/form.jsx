"use client";

import React from "react";

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import Container from "~/components/Container";

import { ApiResponse } from "~/app/api/response"
import { CreateAccountResponse } from "~/app/api/create-account/types"

import { redirect } from "next/navigation"
import ImageUpload from "~/components/ImageUpload";
import useSupabase from "~/auth/useSupabase";

import UserIcon from "@mui/icons-material/Person"

/**
 * @typedef {{ firstName?: string, lastName?: string, snap?: string, images: string[] }} CreateAccountFormProps
 */

/**
 * @param {CreateAccountFormProps} param0
 * @returns
 */
export default function CreateAccountForm({ firstName, lastName, snap, images }){
	const readonlyForm = firstName && lastName && snap;

	const supabase = useSupabase();

	const [created, setCreated] = React.useState(false);
	const [image, setImage] = React.useState(/** @type {string | null} */ (images.length > 0 ? images[0] : null));

	React.useEffect(() => {
		if(created){
			redirect("/app");
		}
	}, [created])

	/** @type {React.FormEventHandler<HTMLFormElement>} */
	const onFormSubmit = (e) => {
		e.preventDefault();
		if(!image) return;
		if(readonlyForm) setCreated(true);

		const formData = new FormData(e.target);
		fetch(`${window.location.origin}/api/create-account`, {
			method: "POST",
			body: formData,
		})
			.then(v => /** @type {Promise<ApiResponse<CreateAccountResponse>>} */ (v.json()))
			.then(({ data, error }) => {
				if(error) {
					console.error(error);
				}
				else if(data){
					setCreated(true);
				}
			})
	}

	/**
	 * @param {string} path
	 * @returns {Promise<void>}
	 */
	const onImageUpload = async (path) => {
		const publicUrl = supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
		setImage(publicUrl);
	}

	return <Container>
		<Typography variant="h1" mb={2}>
			Create Account
		</Typography>
		<Stack alignItems="center">
			<Box sx={{
				width: "min(12rem, 50%)",
				minHeight: 0,
				aspectRatio: "1",
				overflow: "clip",
				clipPath: "circle(50%)",
				backgroundColor: "rgba(255, 255, 255, 0.05)",
			}}>
				{ image && <img src={image} style={{
					width: "100%", height: "100%",
					objectFit: "cover", objectPosition: "center",
				}} />}
				{ !image && <UserIcon sx={{
					width: "100%", height: "inherit",
					}}
				/>}
			</Box>
			<ImageUpload onFileUpload={onImageUpload} />
		</Stack>
		<Stack
			gap={1}
			component="form" onSubmit={onFormSubmit}
		>
			<TextField variant="outlined" required
				disabled={readonlyForm}
				value={readonlyForm ? firstName : undefined}
				name="first-name" id="first-name"
				label="First Name"
			/>
			<TextField variant="outlined" required
				disabled={readonlyForm}
				value={readonlyForm ? lastName : undefined}
				name="last-name" id="last-name"
				label="Last Name"
			/>
			<TextField variant="outlined" required
				disabled={readonlyForm}
				value={readonlyForm ? snap : undefined}
				name="snap" id="snap"
				label="Snapchat Username"
			/>
			<Button type="submit" sx={{ alignSelf: "center" }} disabled={!image}>
				Submit
			</Button>
		</Stack>
	</Container>
}