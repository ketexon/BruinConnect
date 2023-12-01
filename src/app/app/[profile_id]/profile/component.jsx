"use client";
// /** @type {import("next").Metadata} */

import React from 'react';
import { Avatar, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import Image from 'next/image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import styles from './styles.css';

import useSupabase from '~/auth/useSupabase';

// export const metadata = {
//     title: 'BruinConnect | Profile',
// }
function ProfilePicture({ image }) {
	return (
		// <div style={{
		// 	display: "flex",
		// 	justifyContent: "center",
		// 	height: '1',
		// 	aspectRatio: '3',
		// 	position: 'relative'
		// }}>
		// 	<Image src={image} alt="Profile Picture" layout="fill" objectFit="contain" />
		// </div>
		<Box
			sx={{
				width: 150,
				height: 150,
				background: `url(${image})`,
				backgroundSize: "100px",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}} 
		/>
	)
}

function EditButton() {
	const [editing, setEditing] = useState(false);
	const handleEditing = () => {
		setEditing(true);
	};

	return (
		<IconButton>
			<EditIcon onClick={handleEditing} class="editbutton">
			</EditIcon>
		</IconButton>
	)
}

function ProfilePosts() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<ImageList sx={{ width: 500, height: 450 }}>
				{itemData.map((item) => (
					<ImageListItem key={item.img}>
						<img
							srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
							alt={item.title}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</div >
	)
}

export default function ({ user_id, profile_id }) {
	const supabase = useSupabase();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [profileImage, setProfileImage] = useState();

	useEffect(() => {
		if(supabase === null) return;
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
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
				{profileImage && <ProfilePicture image={profileImage} />}
			</Box>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}>

				{firstName} {lastName}
				<EditButton />
			</div>

			<ProfilePosts />

		</>
	);

}

const itemData = [
	{
		img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
		title: 'Breakfast',
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
	},
]
