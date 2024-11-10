import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { LogoIcon, StreakBox } from "../General";

const UserCard = () => {
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
      <StreakBox count={11990} />
      <StreakBox count={110} />
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
            overflow: "hidden"
          }}
          maxWidth={70}
        >
          <Typography
          sx={{
            fontWeight:'700'
          }}
          >Puviayar
          </Typography>
        </Box>

        <Avatar
          width={44}
          height={44}
          alt="Remy"
          src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
        />
      </Box>
    </Box>
  );
};

export default UserCard;
