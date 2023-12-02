import "server-only";

/** @type {import("next").Metadata} */
import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import createServerClient from "~/auth/createServerClient.js";
import getUser from "~/auth/getUser";

export const metadata = {
    title: 'BruinConnect | Matches',
}

export default async function Matches() {
    const supabase = createServerClient();
	const user = await getUser(supabase);
    const user_id = user.auth.id;

    const { data: user_liked_data } = await supabase.from('UserSwipes').select('*').eq('user_id', user_id).eq('right', true);
    const { data: liked_user_data } = await supabase.from('UserSwipes').select('*').eq('other_id', user_id).eq('right', true);

    let user_liked = new Set();
    user_liked_data.forEach(like => user_liked.add(like.other_id));

    let matches = [];
    for (const like of liked_user_data) {
        if (user_liked.has(like.user_id)) {
            matches.push(like.user_id);
        }
    }

    const profiles = matches.map(other_id => <Profile key={other_id} user_id={other_id} />);

	return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
            <Typography variant="h1" mb={4}>Your Matches</Typography>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2}>
                {profiles}
                </Stack>
            </div >
        </>
    );
}

async function Profile({ user_id }){
    const supabase = createServerClient();
    const { data: user_data } = await supabase.from('Users').select('*').eq('UserUID', user_id);
    console.log(user_data[0].Snap);

	return (
        <Card sx={{ padding: 4 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="./Person.jpg"
            title="Name"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user_data[0].FirstName} {user_data[0].LastName}
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
            <Button size="small">View Profile</Button>
          </CardActions>
          <CardActions>
          <Button>
          <Avatar src={'./SnapChatLogo.png'} variant="square"/>
          </Button>
          <Typography gutterBottom variant="h5" component="div">
              {user_data[0].Snap}
            </Typography>
          </CardActions>
        </Card>
      );
}
