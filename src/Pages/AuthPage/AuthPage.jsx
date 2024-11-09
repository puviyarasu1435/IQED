import { Box } from "@mui/material";
import React from "react";
import AuthContainer from "../../Components/Auth/AuthContainer";

const AuthPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AuthContainer />
    </Box>
  );
};

export default AuthPage;
