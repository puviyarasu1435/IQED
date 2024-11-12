import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ExploreHeader = () => {
  const UserData = useSelector((state) => state.UserState);
  return (
    <Box
      sx={{
        width: "100%",
        height: "15%",
        marginTop:'20px',
        display: "block",
        alignItems: "center",
      }}
    >
      <Typography
        fontWeight={700}
        padding={0}
        lineHeight={1}
        sx={{
          fontSize: { xs: "30px", lg: "70px", md: "40px" },
          color:'#02216F'
        }}
      >
        Hello! {UserData.UserName}
      </Typography>
    </Box>
  );
};

export default ExploreHeader;
