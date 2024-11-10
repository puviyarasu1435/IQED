import { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import CarouselBox from "./SubComponets/CarouselBox";
import SignInBox from "./SubComponets/SignInBox";
import SignUpBox from "./SubComponets/SignUpBox";
import { Logo } from "../../Common";

const AuthContainer = () => {
  const [isLoginPage, setisLoginPage] = useState(true);

  const handelPageSwitch = () => {
    setisLoginPage(!isLoginPage);
  };

  return (
    <Paper
      component="main"
      sx={{
        backgroundColor: "#FFFFFF",
        height: { xs: "80vh", md: "80vh" },
        width: { xs: "80vw", md: "70vw" },
        borderRadius: { xs: "8px", md: "16px" },
        p: 2,
        position:'relative'
      }}
    >
      <Box sx={{position:'absolute'}}>
        <Logo  />
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          height: "100%",
          overflow: "hidden",
          backgroundSize: "cover",
          borderRadius: "8px",
          //display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoginPage ? (
          <SignInBox PageSwitch={handelPageSwitch} />
        ) : (
          <SignUpBox PageSwitch={handelPageSwitch} />
        )}
        <CarouselBox />
      </Stack>
    </Paper>
  );
};

export default AuthContainer;
