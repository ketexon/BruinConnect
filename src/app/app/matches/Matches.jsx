"use client";

import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { TextField } from '@mui/material';
import Container from '~/components/Container';
import InputAdornment from "@mui/material/InputAdornment"

import SearchIcon from "@mui/icons-material/Search"

/**
 * 
 * @param {{ matchData: import("~/auth/getUser").User[] }} param0 
 * @returns 
 */
export default function Matches({ matchData }) {
    // const filteredMatchData = 
    const [search, setSearch] = React.useState("");

    const [filteredMatchData, setFilteredMatchData] = React.useState(matchData);

    const profiles = filteredMatchData.map(({ data, images }) => <Profile key={data.UserUID} data={data} images={images} />);

    React.useEffect(() => {
        setFilteredMatchData(
            matchData.filter(({ data: { FirstName, LastName, Snap } }) =>
                `${FirstName} ${LastName}`
                    .toLowerCase()
                    .includes(search)
                || Snap.toLowerCase().includes(search)
            )
        )
    }, [search])


    return (
        <Container sx={{ pt: 2 }}>
            <Stack direction="column" alignItems="stretch">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h1" mb={4}>Your Matches</Typography>
                </div>
                <TextField
                    label="Search"
                    value={search}
                    sx={{ mb: 2 }}
                    onChange={(e) => { setSearch(e.target.value) }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <Stack spacing={2} alignItems="stretch">
                    {profiles}
                </Stack>
            </Stack>
        </Container>
    );
}


function Profile({ data, images }) {
    return (
        <Card sx={{ padding: 3 }}>
            <CardMedia
                sx={{ aspectRatio: 1, zIndex: 1 }}
                image={images[0]}
                title="Name"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.FirstName} {data.LastName}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                Age
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Gender
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Pronouns
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Hometown
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Major
            </Typography> */}
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} href={`/app/${data.UserUID}/profile`}>View Profile</Button>
            </CardActions>
            <CardActions>
                <Button>
                    <Avatar src={'/SnapchatLogo.png'} variant="square" />
                </Button>
                <Typography gutterBottom variant="h5" component="div">
                    {data.Snap}
                </Typography>
            </CardActions>
        </Card>
    );
}
