"use client";

import './swipe.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useSupabase from '~/auth/useSupabase';

import HeartIcon from "@mui/icons-material/Favorite"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const SwipePage = ({ similar_users, userId }) => {
    const supabase = useSupabase();

    const [startX, setStartX] = React.useState(0);
    const [endX, setEndX] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [userIndex, setUserIndex] = React.useState(0);
    const [users, setUsers] = React.useState(null);
    const [loaded, setLoaded] = React.useState(false);
    const [swipingRight, setSwipingRight] = React.useState(false);

    const swipeIconRef = React.useRef();

    const logUserSwipe = async (userId, otherId, rightSwipe) => {
        try {
            const { data, error } = await supabase
                .from('UserSwipes')
                .insert([
                    { user_id: userId, other_id: otherId, right: rightSwipe },
                ]);
            if(error) console.error("Error inserting swipe:", error);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

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
                        UserUID: user.UserUID,
                        name: user.FirstName + ' ' + user.LastName,
                        imageUrl: imageUrl
                    });
                };

                // set user data
                if (users.length !== 0)
                    setUsers(userData);
                setLoaded(true);
            }
            catch (error) {
                console.log('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [supabase]);

    const handleStart = (clientX) => {
        if (!users || userIndex >= users.length) return; // Disable swipe when no users left
        setStartX(clientX);
        setIsDragging(true);

        swipeIconRef.current.style.transform = `scale(0%)`
    }

    const handleEnd = (clientX) => {
        if (!users || userIndex >= users.length) return; // Disable swipe when no users left
        setEndX(clientX);
        setIsDragging(false);

        const card = document.getElementById('swipe-card');
        card.style.transform = `translateX(0px)`; // reset position
        swipeIconRef.current.style.transform = `scale(0%)`;
    }

    const handleMove = (clientX) => {
        if (!users || userIndex >= users.length) return; // Disable swipe when no users left
        if(isDragging) {
            const card = document.getElementById('swipe-card');
            const moveDistance = clientX - startX;
            if(moveDistance > 0 != swipingRight) {
                setSwipingRight(moveDistance >= 0);
            }

            // here we're setting rotation angle in range from -15 to 15 degrees based on move distance.
            const rotateAngle = Math.max(-15, Math.min(15, moveDistance / 13));

            card.style.transform = `translateX(${moveDistance}px) rotate(${rotateAngle}deg)`;

            const iconScale = Math.min(1, Math.abs(moveDistance) / 150);
            console.log(iconScale);
            swipeIconRef.current.style.transform = `scale(${iconScale * 100}%)`
        }
    }

    React.useEffect(() => {
        const diffX = endX - startX;

        if (!users || users.length === 0) {
            return;
        }
        // Get current user data
        const currentUser = users[userIndex];

        if (diffX > 80) {
            // console.log('Swipe right, now showing user #' + userIndex); // positive value means swipe right
            logUserSwipe(userId, currentUser.UserUID, true);
        }
        else if (diffX < -80) {
            // console.log('Swipe left, now showing user #' + userIndex); // negative value means swipe left
            logUserSwipe(userId, currentUser.UserUID, false);
        }
        else
            return;

        if (userIndex+1 < users.length)
            setUserIndex(prev => prev + 1);
        else
            setUsers(null);

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
            <div>
            {
                loaded && users && (
                    <Card sx={{ width: 345, cursor: "pointer" }} id="swipe-card">
                        <CardMedia
                            sx={{ height: 350 }}
                            image={users[userIndex].imageUrl}
                            title={users[userIndex].name}
                            component='img'
                            draggable={false}
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
            {
                loaded && !users && (
                    <Typography>You've swiped on all users!</Typography>
                )
            }
            {
                <Box sx={theme => ({
                    position: "absolute",
                    zIndex: theme.zIndex.fab,
                    left: 0, right: 0,
                    top: 0, bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                })}>
                    <Box ref={swipeIconRef}
                        style={{ transform: `scale(0%)` }}
                        sx={theme => ({
                            transition: theme.transitions.create('transform', {
                                duration: "0.05s",
                                easing: theme.transitions.easing.linear,
                            })
                        })}
                    >
                        { swipingRight
                            ? <HeartIcon sx={{ fontSize: "64px" }}></HeartIcon>
                            : <SentimentVeryDissatisfiedIcon sx={{ fontSize: "64px" }}></SentimentVeryDissatisfiedIcon>
                        }
                    </Box>
                </Box>
            }
            </div>
        </div>
    );
}

export default SwipePage;