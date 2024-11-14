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
        height:'100%',
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
      <Box
        sx={{
          display: "flex",
          width: isSm ? null : "100%",
          height: "100%",
          marginTop: isSm ? "50px" : null,
          mb: isSm ? "30px" : null,
          padding: "0 20px",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
         
              
        }}
      >
        <Outlet />
      </Box>
      <Box
        sx={{
          width: "500px",
          height: isSm ? "none" : "100%",
          display: "flex",
          flexDirection: isSm ? "row" : "column",
        }}
        gap={2}
      >
        <UserCard />
        {!isSm && <SideBar />}
      </Box>
    </Box>
  );
};

export default UserLayout;
