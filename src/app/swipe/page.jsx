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

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


const SwipePage = () => {
  const [startX, setStartX] = React.useState(0);
  const [endX, setEndX] = React.useState(0);
  const [value, setValue] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [userIndex, setUserIndex] = React.useState(0);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data: Users, error } = await supabase
        .from('Users')
        .select('*');
      
      if (error) {
        console.log('Failed to fetch user data:', error);
      } else if (Users.length > userIndex) {
        const fetchedUser = Users[userIndex]; 

        // Fetch user's image from UserImages
        /*const { data: userImages, error: imgError } = await supabase
          .from('UserImages')
          .select('path')
          .eq('user_id', fetchedUser.user_id);

        if (imgError) {
          console.log('Failed to fetch user image', imgError);
        } else {
          // Set the user data to state
          setUser({
             name: fetchedUser.FirstName + ' ' + fetchedUser.LastName,
             imageUrl: userImages[0].path, // assuming path is a url of the image. You might need to process the path further to make it a complete URL if necessary.
             description: "User description" 
          });
        }*/

        // Set the user data to state
        setUser({
           name: fetchedUser.FirstName + ' ' + fetchedUser.LastName, 
           imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWU1ODBiNGUtMzVjNi00MzdhLTk0OTktOWRiOTIxMWNhOGI2XkEyXkFqcGdeQXVyMTU2OTM5NDQw._V1_FMjpg_UX1000_.jpg',
           description: "User description" 
        });
      }
    };

    fetchUserData();
  }, []);

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
          setUserIndex(userIndex + 1);
      } else if (diffX < -50) {
          console.log('Swipe left, now showing user #' + userIndex); // negative value means swipe left
          setUserIndex(userIndex + 1);
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
        user && (
        <Card sx={{ width: 345 }} id="swipe-card">
        <CardMedia
          sx={{ height: 350 }}
          image={user.imageUrl}
          title={user.name}
        />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        )
      }
      
      </div>
      <div>
      <Box sx={{ width: 345 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" />
          <BottomNavigationAction label="Connect" />
          <BottomNavigationAction label="Matches" />
        </BottomNavigation>
      </Box>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default SwipePage;