"use client";
// /** @type {import("next").Metadata} */

import React from 'react';
import { Avatar, Typography, Box, Grid, Paper, IconButton } from '@mui/material';
import Image from 'next/image'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import styles from './styles.css';


// export const metadata = {
//     title: 'BruinConnect | Profile',
// }
function ProfilePicture() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Image src="g" class="circle" width="100" height="100"
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

export default function ProfilePage() {

    return (
        <>
            <ProfilePicture />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}>

                USER_NAME
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
