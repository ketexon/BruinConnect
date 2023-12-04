"use client";
// /** @type {import("next").Metadata} */

import React from 'react';
import { Avatar, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import Image from 'next/image'
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import MUIContainer, { ContainerProps } from "@mui/material/Container"
import styles from './styles.css';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import ImageUpload from '~/components/ImageUpload'

import createBrowserClient from '~/auth/createBrowserClient';
import zIndex from '@mui/material/styles/zIndex';

import useSupabase from '~/auth/useSupabase';

// export const metadata = {
//     title: 'BruinConnect | Profile',
// }
function ProfilePicture({ image, alt }) {
	return (
		<div style={{
			width: "400px",
			height: "250px",
			display: "flex",
			justifyContent: "center",
		}}>
			{image && <Image
				src={image} className="circle" width="400" height="400"
				alt={alt}
			/>}
		</div >
	)
}

function DescriptionEditor({ initial_description, handleSave, readonly }) {
	const placeholder = readonly ? "User has no description :(" : 'Tap to edit description';

	return (
		<EditText
			readonly={readonly}
			placeholder={placeholder}
			defaultValue={initial_description}
			onSave={(newDescription) => handleSave(newDescription)}
			style={{
				width: "100%"
			}}
		/>
	);
}


export default function ({ user_id, profile_id, user }) {
	const supabase = useSupabase();
	const firstName = user.data.FirstName;
	const lastName = user.data.LastName;
	const description = user.data.description;
	const [profileImage, setProfileImage] = useState(
		user.images.length > 0 ? user.images[0] : ""
	);

	function handleImageUpload(data) {
		const new_image = supabase.storage.from('images').getPublicUrl(data).data.publicUrl;
		setProfileImage(new_image)
	}

	async function handleSaveDescription(newValue) {
		try {
			const { data, error } = await supabase
				.from('Users')
				.update({ description: newValue.value })
				.eq('UserUID', profile_id);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<MUIContainer sx={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<ProfilePicture image={profileImage} alt={`${firstName} ${lastName}'s profile photo`} />
				{
					user_id === profile_id && <ImageUpload onFileUpload={handleImageUpload} />
				}
				<h1>{firstName} {lastName} </h1>
				<DescriptionEditor initial_description={description} handleSave={handleSaveDescription} readonly={user_id !== profile_id} />
			</MUIContainer>

		</>
	);

}
