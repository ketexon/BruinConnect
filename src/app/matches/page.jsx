/** @type {import("next").Metadata} */
import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



export const metadata = {
    title: 'BruinConnect | Matches',
}

export default function Matches() {
	return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                Your Matches
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={2}>
                    <Profile>Item 1</Profile>
                    <Profile>Item 2</Profile>
                    <Profile>Item 3</Profile>
                </Stack>
            </div >
        </>
    );
}

function Profile(){
	return (
        <Card sx={{ padding: 2 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="C:\Users\benxi\Downloads\1695852588261.jpg"
            title="Name"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View Profile</Button>
          </CardActions>
        </Card>
      );
}
