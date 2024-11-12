import { Avatar, Box, Card, LinearProgress, Typography } from "@mui/material";
import React from "react";

const QuestCard = ({ icon, title, progress, goal, reward, About }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "2px 3px #02216F",
        borderRadius: "10px",
        border: "2px solid",
        borderColor: "#02216F",
      }}
    >
      <Avatar sx={{ backgroundColor: "#FF7324" }}>{icon}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" fontWeight="900">
            {title}
          </Typography>
          <Typography variant="body1" fontWeight="900" color="Black">
            +{reward}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={(progress / goal) * 100}
            sx={{
              height: 10,
              borderRadius: 10,
              marginY: 1,
              width: "100%",
              backgroundColor: "#02216F",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFDA55",
              },
            }}
          />
          <Typography variant="body2" color="textSecondary">
            {progress}/{goal}
          </Typography>
        </Box>
        <Typography variant="caption" fontWeight="400" color="Black">
          {About}
        </Typography>
      </Box>
    </Card>
  );
};

export default QuestCard;
