import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { IQGemIcon } from "../../../assets/Image";

const GemsBox = ({count}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffff",
          borderRadius: "50px",
          width:"auto",
          height:{lg:"25px"},
          padding: "0 12px 0 0 ",
        }}
        maxWidth={60}
        gap={0.3}
      >
        <Avatar src={IQGemIcon} sx={{ width: 25, height: 25 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "13px",p:'2px' }}>
          {count}
        </Typography>
      </Box>
    </>
  );
};

export default GemsBox;
