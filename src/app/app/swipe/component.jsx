"use client";

import './swipe.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useSupabase from '~/auth/useSupabase';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


const SwipePage = ({ similar_users }) => {
    const supabase = useSupabase();

    const [startX, setStartX] = React.useState(0);
    const [endX, setEndX] = React.useState(0);
    const [value, setValue] = React.useState(1);
    const [isDragging, setIsDragging] = React.useState(false);
    const [userIndex, setUserIndex] = React.useState(0);
    const [users, setUsers] = React.useState(null);

    React.useEffect(() => {
        if(supabase === null) return;
        const fetchUserData = async () => {
            try {
                // get data of similar users
                const { data: users } = await supabase
                    .from('Users')
                    .select('*')
                    .in('UserUID', similar_users);

                // get image urls for each user
                const userData = [];
                for (const user of users) {
                    const { data: path } = await supabase
                        .from('UserImages')
                        .select('path')
                        .eq('user_id', user.UserUID)
                        .limit(1);

                    const imageUrl = path.length ? supabase.storage.from("images").getPublicUrl(path[0].path).data.publicUrl : "";

                    userData.push({
                        name: user.FirstName + ' ' + user.LastName,
                        imageUrl: imageUrl
                    });
                };

                // set user data
                setUsers(userData); 
            }
            catch (error) {
                console.log('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [supabase]);

    const handleStart = (clientX) => {
        setStartX(clientX);
        setIsDragging(true);
    }
    
    const handleEnd = (clientX) => {
        setEndX(clientX);
        setIsDragging(false);
        
        const card = document.getElementById('swipe-card');
        card.style.transform = `translateX(0px)`; // reset position
    }

    const handleMove = (clientX) => {
        if(isDragging) {
            const card = document.getElementById('swipe-card');
            const moveDistance = clientX - startX;
        
            // here we're setting rotation angle in range from -15 to 15 degrees based on move distance.
            const rotateAngle = Math.max(-15, Math.min(15, moveDistance / 13));
        
            card.style.transform = `translateX(${moveDistance}px) rotate(${rotateAngle}deg)`;
        }
    }

    React.useEffect(() => {
        const diffX = endX - startX;
        if (diffX > 50) {
            console.log('Swipe right, now showing user #' + userIndex); // positive value means swipe right
        }
        else if (diffX < -50) {
            console.log('Swipe left, now showing user #' + userIndex); // negative value means swipe left
        }
        else
            return;

        if (userIndex+1 < users.length)
            setUserIndex(prev => prev + 1);
        else {
            // show some text or something here
        }
        
    }, [endX]);

    return (
        <div className="center-div" 
            onTouchStart={(e) => handleStart(e.touches[0].clientX)} 
            onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseUp={(e) => handleEnd(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                {
                    users && (
                        <Card sx={{ width: 345 }} id="swipe-card">
                            <CardMedia
                                sx={{ height: 350 }}
                                image={users[userIndex].imageUrl}
                                title={users[userIndex].name}
                                component='img'
                            />
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {users[userIndex].name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        )
                }
                </div>
            </ThemeProvider>
        </div>
    );
}

export default SwipePage;