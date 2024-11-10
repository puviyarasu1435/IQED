import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
const LevelCard = ({ index, content }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        boxShadow: "2px 3px #02216F",
        boxSizing: "border-box",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/374916/pexels-photo-374916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"700"}}>
            NUMBER LINE
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default LevelCard;
