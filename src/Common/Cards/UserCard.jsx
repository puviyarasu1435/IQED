import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { GemsBox, LogoIcon, MenuBox, StreakBox } from "../General";
import { useSelector } from "react-redux";

const UserCard = () => {
  const UserData = useSelector((state) => state.UserState);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        position: isSm ? "fixed" : "static",
        justifyContent: isSm ? "space-between" : "space-around",
        top: 0,
        alignItems: "center",
        height: isSm ? "50px" : "60px",
        boxSizing: "border-box",
        borderRadius: isSm ? "none" : "10px",
        boxShadow: isSm ? "none" : "3px 3px #02216F",
        p: "10px",
        overflow: "hidden",
        backgroundColor: "#FFDA55",
      }}
      gap={1}
    >
      {isSm && <LogoIcon widthCus={"34px"} />}
      <GemsBox count={UserData.IQGems} />
      <StreakBox count={UserData.Streak} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={1}
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
          maxWidth={70}
        >
          <Typography
            sx={{
              fontWeight: "700",
            }}
          >
            {UserData.UserName}
          </Typography>
        </Box>
        <IconButton onClick={handleClick}>
          <Avatar
            width={44}
            height={44}
            alt="Remy"
            src="https://cdn-icons-png.flaticon.com/512/185/185810.png"
          />
        </IconButton>
        <MenuBox open={open} anchorEl={anchorEl} handleClose={handleClose} />
      </Box>
    </Box>
  );
};

export default UserCard;
