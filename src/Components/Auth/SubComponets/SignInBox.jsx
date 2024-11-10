import { Box, Button, Typography } from "@mui/material";
import SignInForm from "../Form/SignInForm";

const SignInBox = ({ PageSwitch }) => {
  return (
    <Box
      height="100%"
      width="100%"
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        width={"100%"}
        height={"100%"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignInForm PageSwitch={PageSwitch} />
      </Box>
    </Box>
  );
};

export default SignInBox;
