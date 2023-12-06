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

import useSupabase from '~/auth/useSupabase';
import fetchMatches from './fetchMatches';
import ReactPullToRefresh from 'react-pull-to-refresh';

/**
 *
 * @param {{ matchData: import("~/auth/getUser").User[] }} param0
 * @returns
 */
export default function Matches({ initialMatchData }) {
    const supabase = useSupabase();

    const [matchData, setMatchData] = React.useState(initialMatchData);
    const [search, setSearch] = React.useState("");

    const [filteredMatchData, setFilteredMatchData] = React.useState(initialMatchData);

    const profiles = filteredMatchData.map(({ data, images }) => <Profile key={data.UserUID} data={data} images={images} />);

    React.useEffect(() => {
        setFilteredMatchData(matchData);
        setSearch(""); // clear search bar
    }, [matchData]);

    React.useEffect(() => {
        setFilteredMatchData(
            matchData.filter(({ data: { FirstName, LastName, Snap } }) =>
                `${FirstName} ${LastName}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
                || Snap.toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search]);

    const hasMatches = matchData.length > 0;
    
    const handleRefresh = async () => {
        console.log(supabase == null);
        if (supabase != null)
            setMatchData(await fetchMatches(supabase));
    }


    return (
        <ReactPullToRefresh onRefresh={handleRefresh}>
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
                    {/* <Button onClick={handleRefresh}>Refresh</Button> */}
                    {
                    hasMatches ?
                        <Stack direction="column" alignItems="stretch">
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
                        {
                        Object.keys(profiles).length !== 0 ? 
                            <Stack spacing={2} alignItems="stretch" sx={{ pb: 10 }}>
                                {profiles}
                            </Stack>
                        :
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography> Your search did not match any users.</Typography>
                                
                            </div>
                        }
                        </Stack>
                    : 
                        <Stack direction="column" alignItems="stretch">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h5"> You have no matches. Keep swiping!</Typography>
                                
                            </div>
                            <Button sx= {{margin:3 }} variant="outlined" size="large" component={Link} href={`/app/swipe`}>Swipe Page</Button>
                        </Stack>
                }
                </Stack>    
            </Container>
        </ReactPullToRefresh>
    );



function Profile({ data, images }) {
    return (
        <Card sx={{ padding: 3 }}>
            <CardMedia
                sx={{ aspectRatio: 1, zIndex: 1 }}
                image={images[0]}
                title="Name"
            />
            <CardContent>
                <Typography variant="h3" component="div">
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
                <Avatar src={'/SnapchatLogo.png'} variant="square" />
                <Typography gutterBottom variant="h5" component="div">
                    {data.Snap}
                </Typography>
            </CardActions>
        </Card>
    );
}
}
