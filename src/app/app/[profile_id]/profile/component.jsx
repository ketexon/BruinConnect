"use client";
// /** @type {import("next").Metadata} */

import React from 'react';
import { Avatar, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import Image from 'next/image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import MUIContainer, { ContainerProps } from "@mui/material/Container"
import styles from './styles.css';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import createBrowserClient from '~/auth/createBrowserClient';
import zIndex from '@mui/material/styles/zIndex';

import useSupabase from '~/auth/useSupabase';

// export const metadata = {
//     title: 'BruinConnect | Profile',
// }
function ProfilePicture({ image }) {
	return (
		<div style={{
			display: "flex",
			justifyContent: "center",
		}}>
			<Image src={image} className="circle" width="400" height="400"
			/>
		</div >
	)
}

function EditButton() {
	const [editing, setEditing] = useState(false);
	const handleEditing = () => {
		setEditing(true);
	};

	return (
		<IconButton>
			<EditIcon onClick={handleEditing} className="editbutton">
			</EditIcon>
		</IconButton>
	)
}

function DescriptionEditor({ initial_description, handleSave }) {
	const [description, setDescription] = useState({ initial_description });

	return (
		<EditText
			placeholder='Edit your description'
			onSave={(newDescription) => handleSave(newDescription)}
		/>
	);
}


export default function ({ profile_id }) {
	const supabase = useSupabase();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [profileImage, setProfileImage] = useState();

	// const handleDescriptionSave = (newValue) => {
	// 	console.log("new value: " + newValue);
	// 	supabase.from("Users").update({ description: newValue }).eq({ UserUID: profile_id })
	// }

	async function handleSave(newValue) {
		console.log(profile_id + " " + newValue.value);

		// supabase.from("Users").update({ description: newValue }).eq({ UserUID: profile_id });

		try {

			// const { data, error } = await supabase
			// 	.from('Users')
			// 	.update({ description: newValue.value })
			// 	.eq('UserUID', profile_id)
			// 	.select();

			const { error } = await supabase
				.from('Users')
				.insert({ description: newValue, UserUID: profile_id });

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (supabase === null) return;
		const fetchData = async () => {
			try {
				const { data: data } = await supabase.from('Users').select('*').eq('UserUID', profile_id);
				setFirstName(data[0].FirstName);
				setLastName(data[0].LastName);

				const { data: path } = await supabase.from('UserImages').select('path').eq('user_id', profile_id).limit(1);
				const imageUrl = path.length ? supabase.storage.from("images").getPublicUrl(path[0].path).data.publicUrl : "";
				setProfileImage(imageUrl);

			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [supabase]);

	return (
		<>
			<MUIContainer sx={{
				position: 'relative',
				height: '85vh', // Set the height to 50% of the viewport height
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>

				<ProfilePicture image={profileImage} /> <EditButton />
				<h1>{firstName} {lastName}</h1>

				<DescriptionEditor initial_description="" handleSave={handleSave} />

			</MUIContainer>

		</>
	);

}

