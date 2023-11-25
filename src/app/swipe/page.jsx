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
  const user = 
    {
      //this information will be fetched
      name: 'Dwayne Johnson',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BOWU1ODBiNGUtMzVjNi00MzdhLTk0OTktOWRiOTIxMWNhOGI2XkEyXkFqcGdeQXVyMTU2OTM5NDQw._V1_FMjpg_UX1000_.jpg',
      description: 'Many people know me as The Rock. I like working out and would like a partner to do some extra cardio with.'
    }

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
          console.log('Swipe right'); // positive value means swipe right
      } else if (diffX < -50) {
          console.log('Swipe left'); // negative value means swipe left
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