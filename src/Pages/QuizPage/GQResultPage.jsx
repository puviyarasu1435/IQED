import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfettiEffect from "./ConfettiEffec";
import { popGIF } from "../../assets";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#C6C6C6",
      fontWeight: "bold",
    },
    "& label.Mui-focused": {
      color: "#02216F",
      fontWeight: "bold",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#02216F",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#02216F",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#02216F",
      },
    },
  },
})(TextField);

const GQSuccessPage = () => {
  const location = useLocation();
  // const { Score, totalTimeTaken } = location.state;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const textFieldStyles = {
    borderRadius: 2,
    bgcolor: "#fff",
    fontWeight: "bold",
    color: "#02216F",
    boxShadow: "2px 3px #02216F",
  };

  // Update URL and manage state when selectedMethod changes
  useEffect(() => {
    const hash = selectedMethod === "email" ? "#GetViaEmail" : selectedMethod === "whatsapp" ? "#GetViaWhatsApp" : "";
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [selectedMethod]);

  // Listen for hash changes and update selectedMethod accordingly
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#GetViaEmail") {
        setSelectedMethod("email");
      } else if (window.location.hash === "#GetViaWhatsApp") {
        setSelectedMethod("whatsapp");
      } else {
        setSelectedMethod(null);
      }
    };

    // Initial check for hash on mount
    handleHashChange();

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderForm = () => (
    <Box
      sx={{
        width: { sx: "30%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          sx={{ color: "#02216F" }}
          onClick={() => setSelectedMethod(null)}
        >
          <ArrowCircleLeftIcon fontSize="inherit" />
        </IconButton>
        <Typography
          sx={{
            color: "#02216F",
            fontSize: { xs: "24px", md: "28px" },
            fontWeight: "bold",
          }}
        >
          Get result via {selectedMethod === "email" ? "Email" : "WhatsApp"}:
        </Typography>
      </Stack>
      <CssTextField
        id="name-field"
        label="Name"
        variant="outlined"
        InputProps={{
          sx: textFieldStyles,
        }}
      />
      <CssTextField
        id="contact-field"
        label={selectedMethod === "email" ? "Email" : "WhatsApp No"}
        variant="outlined"
        InputProps={{
          sx: { ...textFieldStyles, height: "6vh" },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{
          fontWeight: "bold",
          backgroundColor: "#1A49BA",
          color: "#fff",
          boxShadow: "2px 3px #fff",
          borderRadius: { xs: "5px", md: "8px" },
          p: "10px",
          textTransform: "none",
          border: "1px solid #fff",
          "&:hover": {
            backgroundColor: "#02216F",
            transform: "translateY(-5px)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "2px 3px #fff",
          },
        }}
      >
        Send
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: 0,
      }}
    >
      <ConfettiEffect />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedMethod ? (
          renderForm()
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box",
              p: isSm ? "15px" : null,
            }}
          >
            <Box
              width={"200px"}
              height={"200px"}
              component="img"
              alt="Pop"
              src={popGIF}
            />
            <Typography
              align="center"
              sx={{
                bgcolor: "#F7DE83",
                px: "15px",
                py: "5px",
                color: "#02216F",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              General Test Completed
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                pb: "30px",
                width: { md: "60%" },
                color: "#02216F",
                fontSize: { xs: "24px", md: "36px" },
                fontWeight: "bold",
              }}
            >
              Congratulations on successfully completing the test! You almost
              hit our rank holder's record!
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                width: { md: "60%" },
                color: "#02216F",
                fontSize: "20px",
                fontWeight: "bold",
                pb: "20px",
              }}
            >
              You can view your results via
            </Typography>

            <Stack
              direction="row"
              divider={
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderRightWidth: 2 }}
                />
              }
              spacing={2}
              sx={{
                width: { md: "50%" },
              }}
            >
              <Button
                startIcon={<EmailIcon />}
                fullWidth
                variant="contained"
                onClick={() => setSelectedMethod("email")}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#1A49BA",
                  color: "#fff",
                  boxShadow: "2px 3px #fff",
                  borderRadius: { xs: "5px", md: "8px" },
                  textTransform: "none",
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#ffff",
                    backgroundColor: "black",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #ffff",
                  },
                }}
              >
                Email
              </Button>
              <Button
                startIcon={<WhatsAppIcon />}
                fullWidth
                variant="contained"
                onClick={() => setSelectedMethod("whatsapp")}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#00A259",
                  color: "#fff",
                  boxShadow: "2px 3px #fff",
                  borderRadius: { xs: "5px", md: "8px" },
                  textTransform: "none",
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#ffff",
                    backgroundColor: "#004B2A",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #ffff",
                  },
                }}
              >
                WhatsApp
              </Button>
            </Stack>
            <Typography
              sx={{
                textAlign: "center",
                width: { md: "60%" },
                color: "#02216F",
                fontSize: "16px",
                fontWeight: "400",
                py: "20px",
              }}
            >
              or directly on the platform
            </Typography>
            <Button
              component={Link}
              to="/Signup"
              fullWidth
              variant="contained"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#fff",
                color: "#02216F",
                boxShadow: "2px 3px #02216F",
                borderRadius: { xs: "5px", sm: "5px", md: "8px", lg: "8px" },
                width: "50%",
                textTransform: "none",
                border: "1px solid",
                borderColor: "#02216F",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#02216F",
                  transition: "transform 0.3s ease-in-out",
                  transform: "translateY(-5px)",
                  boxShadow: "2px 3px #02216F",
                },
              }}
            >
              SignUp
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GQSuccessPage;
