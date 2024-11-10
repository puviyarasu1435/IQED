import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { FireIconSVG } from "../../../assets/SVG";

const StreakBox = ({count}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FCEDC5",
          borderRadius: "50px",
          width:"auto",
          height:{lg:"25px"},
          padding: "0 12px 0 0 ",
        }}
        maxWidth={60}
        gap={0.3}
      >
        <Avatar src={FireIconSVG} sx={{ width: 25, height: 25 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "13px",p:'2px' }}>
          {count}
        </Typography>
      </Box>
    </>
  );
};

export default StreakBox;
