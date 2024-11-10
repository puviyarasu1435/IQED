import React from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { MainNavBar, SideBar } from "../../Components";
import { UserCard } from "../../Common";

const UserLayout = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        height: isSm ? "calc(90% - 60px)" : "100%",
        width: "100%",
        display: "flex",
        flexDirection: isSm ? "column-reverse" : "row",
        boxSizing: "border-box",
        p: { sm: "0px", md: "16px" },
        justifyContent: "space-between",
      }}
      gap={2}
    >
      <Box>
        <MainNavBar />
      </Box>
      <Box>
        <Outlet />
      </Box>
      <Box
        sx={{
          width: "300px",
          height: isSm?"none":"100%",
          display: "flex",
          flexDirection:isSm ? "row" : "column",
        }}
        gap={2}
      >
        <UserCard />
        {!isSm && <SideBar  />}
      </Box>
    </Box>
  );
};

export default UserLayout;
