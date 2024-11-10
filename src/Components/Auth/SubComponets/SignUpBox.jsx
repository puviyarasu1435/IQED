import { Box, } from "@mui/material";
import SignUpForm from "../Form/SignUpForm";


const SignUpBox = ({ PageSwitch }) => {
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
        <SignUpForm PageSwitch={PageSwitch} />
      </Box>
    </Box>
  );
};

export default SignUpBox;
