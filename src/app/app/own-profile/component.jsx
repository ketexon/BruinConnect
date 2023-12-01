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


// export const metadata = {
//     title: 'BruinConnect | Profile',
// }
function ProfilePicture() {
	return (
		<div style={{
			display: "flex",
			justifyContent: "center",
		}}>
			<Image src="/default_pfp.jpg" className="circle" width="400" height="400"
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

function DescriptionEditor() {
	const [description, setDescription] = useState('');

	const handleSave = (newValue) => {
		// Handle saving the new description, e.g., send it to the server
		console.log('Description saved:', newValue);
		setDescription(newValue);
	};

	return (
		<EditText
			placeholder='Edit your description'
			onSave={(newDescription) => handleSave(newDescription)}
		/>
	);
}


export default function ({ user_id }) {
	const supabase = createBrowserClient();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: data } = await supabase.from('Users').select('*').eq('UserUID', user_id);
				setFirstName(data[0].FirstName);
				setLastName(data[0].LastName);

			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

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

				<ProfilePicture /> <EditButton />

				<DescriptionEditor />

			</MUIContainer>

		</>
	);

}

