import { Box, Button, Typography } from "@mui/material";

import React from "react";
import SignUpForm from "../Form/SignUpForm";
import { Logo } from "../../../Common";

const SignUpBox = ({ PageSwitch }) => {
  return (
    <Box height="100%" width="100%" >
      <Box sx={{position:'absolute'}}>
        <Logo />
      </Box>
      <Box
        width={"100%"}
        height={"100%"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignUpBox;
