import { Box, Typography } from "@mui/material";
import React from "react";

const ExploreHeader = () => {
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
        Hello! Puviyarsu
      </Typography>
    </Box>
  );
};

export default ExploreHeader;
