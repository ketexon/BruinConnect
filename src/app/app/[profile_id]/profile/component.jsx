"use client";

import React from 'react';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import './styles.css';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import ImageUpload from '~/components/ImageUpload'

import useSupabase from '~/auth/useSupabase';
import Container from '~/components/Container';

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
		<EditTextarea
			rows={15}
			readonly={readonly}
			placeholder={placeholder}
			defaultValue={initial_description}
			onSave={(newDescription) => handleSave(newDescription)}
			style={{
				width: 300,
				overflow: "hidden",
				fontSize: "1rem",
				backgroundColor: readonly ? "transparent" : ""
			}}
		/>
	);
}

/**
 * @param {Object} param0
 * @param {import("~/auth/getOtherUser").OtherUser} param0.user
 * @returns
 */
export default function ({ user, editable }) {
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
				.eq('UserUID', user.data.UserUID);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Container sx={{
				mt: 4,
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<ProfilePicture image={profileImage} alt={`${firstName} ${lastName}'s profile photo`} />
				{
					editable && <ImageUpload onFileUpload={handleImageUpload} />
				}
				<h1>{firstName} {lastName} </h1>
				{
					editable && <Button sx={{ mb: 3 }} variant="outlined" size="large" href="/logout">Logout</Button>
				}
				<DescriptionEditor initial_description={description} handleSave={handleSaveDescription}
					readonly={!editable} />
			</Container>

		</>
	);

}
