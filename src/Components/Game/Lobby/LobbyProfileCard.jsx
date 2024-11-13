import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";


const LobbyProfileCard = () => {
  return (
    <Card sx={{ display: "flex",justifyContent:'center' }}>
      <Box sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'10px'
      }}>
        <Avatar
          alt="Gemy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 60, height: 60,backgroundColor:'red' }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Mac Miller
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default LobbyProfileCard;
