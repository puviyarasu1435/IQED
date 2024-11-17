import React, { useState, useEffect, useRef } from "react";
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
import { LandingHeader } from "../../Components";
import { useSelector } from "react-redux";
import { PDFDocument, rgb } from "pdf-lib";
import Chart from "chart.js/auto";
import { useUploadFileMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";

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
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#02216F",
      },
      "&:hover fieldset": {
        borderColor: "#1A49BA",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1A49BA",
      },
    },
  },
})(TextField);

const GQSuccessPage = () => {
  const location = useLocation();
  const QuizState = useSelector((state) => state.QuizState);
  // const { Score, totalTimeTaken } = location.state;
  const [UploadFileMutation] = useUploadFileMutation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);

  const textFieldStyles = {
    borderRadius: 2,
    bgcolor: "#fff",
    fontWeight: "bold",
    color: "#02216F",
    boxShadow: "2px 3px #02216F",
  };

 
  useEffect(() => {
    const hash = selectedMethod === "email" ? "#GetViaEmail" : selectedMethod === "whatsapp" ? "#GetViaWhatsApp" : "";
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [selectedMethod]);

  const generateChart = () => {
    return new Promise((resolve) => {
      const ctx = canvasRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: [-3, -2, -1, 0, 1, 2, 3],
          datasets: [
            {
              label: "IQ Distribution",
              data: [1, 5, 15, 50, 15, 5, 1],
              fill: true,
              backgroundColor: "rgba(0, 119, 204, 0.3)",
              borderColor: "rgba(0, 119, 204, 1)",
              pointRadius: 0,
            },
            {
              label: "User IQ",
              data: Array(7).fill(null).map((_, i) => (i === 5 ? 110 : null)), // Replace 110 with actual score
              pointRadius: 5,
              pointBackgroundColor: "red",
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            x: { display: false },
            y: { display: false },
          },
        },
      });
      setTimeout(resolve, 100); // wait for chart to be drawn
    });
  };
  
  const generatePdf = async (name, score) => {
    await generateChart(); // Generate chart first

    const chartImage = canvasRef.current.toDataURL("image/png");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();

    page.drawText("IQ Test Result", { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0) });
    page.drawText(`Name: ${name}`, { x: 50, y: height - 100, size: 15, color: rgb(0, 0, 0) });
    page.drawText(`IQ Score: ${score}`, { x: 50, y: height - 130, size: 15, color: rgb(0, 0, 0) });

    const imageBytes = await fetch(chartImage).then(res => res.arrayBuffer());
    const chartImageEmbed = await pdfDoc.embedPng(imageBytes);
    page.drawImage(chartImageEmbed, {
      x: 50,
      y: height - 300,
      width: 500,
      height: 200,
    });

    const pdfBytes = await pdfDoc.save();
    console.log(contact)
    await UploadFileMutation({
      file: new Blob([pdfBytes], { type: "application/pdf" }),
      email: contact, // Pass the email value
    });
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_IQ_Test_Result.pdf`;
    link.click();

  };

  

  const validateContact = (value) => {
    if (value.includes("@")) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      // WhatsApp number validation (basic check for numeric input)
      return /^[0-9]{10,15}$/.test(value);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
     
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    if (!name.trim() || !validateContact(contact)) {
      setError(true);
    } else {
      setError(false);
      generatePdf(name, QuizState.score); 
    }
  };



  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error && !name.trim()}
        // helperText={error && !name.trim() ? "Name is required" : ""}
        required
        InputProps={{
          sx: textFieldStyles,
        }}
      />
      <CssTextField
        id="contact-field"
        label={selectedMethod === "email" ? "Email" : "WhatsApp No"}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        error={error && !validateContact(contact)}
        // helperText={
        //   error && !validateContact(contact)
        //     ? "Enter a valid email or WhatsApp number"
        //     : ""
        // }
        required
        InputProps={{
          sx: { ...textFieldStyles, height: "6vh" },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        required
        onClick={handleSendClick}
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
      <LandingHeader />
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
            {/* <Typography
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
            </Button> */}
          </Box>
        )}
      </Box>
      <canvas ref={canvasRef} style={{ display: "none" }} /> 
    </Box>
  );
};

export default GQSuccessPage;
