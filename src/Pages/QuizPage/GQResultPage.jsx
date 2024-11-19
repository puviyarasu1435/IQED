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
import {  popGIF, Poppins_Bold } from "../../assets";

import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { BellCurveChart, LandingHeader } from "../../Components";
import { useSelector } from "react-redux";
import { PDFDocument, rgb } from "pdf-lib";
import {IQTestResultTem1 } from "../../assets/PDF";
import * as fontkit from "fontkit";
import { useUploadFileMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import toast from "react-hot-toast";


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
  const [selectedMethod, setSelectedMethod] = useState(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [iqscore, setiqscore] = useState(0);
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [UploadFileMutation] = useUploadFileMutation();
  const navigater = useNavigate();
  const calculateIQ = (userScore) => {     
    // Predefined scores array (you could replace this with a dynamic set of scores)
    const scores = [30, 28, 32, 34, 31, 29, 27, 33, 35, 26];        
     // Add the user score to the predefined scores arrayconst 
     const  updatedScores = [...scores, userScore];     
     // Calculate the mean and standard deviationconst 
     const  mean = updatedScores.reduce((sum, score) => sum + score, 0) / updatedScores.length;     
     const standardDeviation = Math.sqrt(       updatedScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / (updatedScores.length - 1)     );     
     // Calculate Z-score and then IQ (IQ = Z-score * 15 + 100)
     const zScore = (userScore - mean) / standardDeviation;     
     const calculatedIQ = (zScore * 15) + 100; 
     return calculatedIQ.toFixed(2); 
     };

  const IQScre =calculateIQ(QuizState.score); 
  if(iqscore==0){
    setiqscore(IQScre)
  }
  console.log("QuizState.Score:", QuizState.Score);
  const handleChartRendered = (data) => {
    setImageData(data); // Store the image data
    console.log("imageData:", imageData);
  };
 
  
  const textFieldStyles = {
    borderRadius: 2,
    bgcolor: "#fff",
    fontWeight: "bold",
    color: "#02216F",
    boxShadow: "2px 3px #02216F",
  };

  useEffect(() => {
    const hash =
      selectedMethod === "email"
        ? "#GetViaEmail"
        : selectedMethod === "whatsapp"
        ? "#GetViaWhatsApp"
        : "";
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [selectedMethod]);

  //  await generateChart();
  //     const chartImage = canvasRef.current.toDataURL("image/png");
  const generatePdf = async (name, score) => {
    if (!imageData) {
      console.error("Image data is not available");
      return;
    }

    // Check if imageData is a valid DataURL
    // if (!imageData.startsWith("data:image/png;base64,")) {
    //   console.error("Invalid image data format:", imageData);
    //   return;
    // }

    // const fontBytes = await fetch(Poppins_Bold).then((res) =>
    //   res.arrayBuffer()
    // );
    // const existingPdfBytes = await fetch(IQTestResultTem1).then((res) =>
    //   res.arrayBuffer()
    // );
    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // pdfDoc.registerFontkit(fontkit);
    // const customFont = await pdfDoc.embedFont(fontBytes);

    // const page = pdfDoc.getPages()[0];
    // const { width, height } = page.getSize();
    // const fontSize = 24;
    // const text = `Hello, ${name}!`;
    // const textWidth = customFont.widthOfTextAtSize(text, fontSize);
    // const x = (width - textWidth) / 2;
    // const y = 510;
    // page.drawText(text, {
    //   x,
    //   y,
    //   size: fontSize,
    //   color: rgb(1, 0.76, 0),
    //   font: customFont,
    // });

    // const iqScoreText = `Your IQ Score is ${score}`;
    // const iqScoreTextWidth = customFont.widthOfTextAtSize(iqScoreText, fontSize);
    // const iqScoreTextX = (width - iqScoreTextWidth) / 2;
    // const iqScoreTextY = y - fontSize - 10; // Adjust to position below the name
    // page.drawText(iqScoreText, {
    //   x: iqScoreTextX,
    //   y: iqScoreTextY,
    //   size: fontSize,
    //   color: rgb(1, 1, 1),
    //   font: customFont,
    // });


    // const chartImageBytes = await fetch(imageData).then((res) =>
    //   res.arrayBuffer()
    // );
    // console.log("chartImageBytes:", chartImageBytes);

    // // const chartImageBytes = await fetch(imageData).then((res) => res.blob());
    // const chartImageData = await pdfDoc.embedPng(chartImageBytes);
    // const chartWidth = 500;
    // const chartHeight = 280;

    // const chartX = (width - chartWidth) / 2;
    // const chartY = ((height - chartHeight) / 2)-130;

    // page.drawImage(chartImageData, {
    //   x: chartX,
    //   y: chartY,
    //   width: chartWidth,
    //   height: chartHeight,
    // });

    // ------------------------------------------------------

    // const chartBlob = new Blob([chartImageBytes], { type: "image/png" });
    // const chartUrl = URL.createObjectURL(chartBlob);

    // // Create an anchor element to trigger download
    // const downloadLink = document.createElement("a");
    // downloadLink.href = chartUrl;
    // downloadLink.download = "chart.png";

    // // Programmatically trigger the download
    // downloadLink.click();

    // // Optionally, revoke the object URL after the download to free up memory
    // URL.revokeObjectURL(chartUrl);

    // --------------------------------------------------------

    // const pdfBytes = await pdfDoc.save();
    // const blob = new Blob([pdfBytes], { type: "application/pdf" });
    // console.log("chart is writed",blob);

    toast.promise(UploadFileMutation({
      file: imageData,
      email: contact,
      name:name,
      score:iqscore  // Pass the email value
    }), {
      loading: "Send...",
      success: () => {
        navigater("/")
        return <b>Check Your Email..</b>;
      },
      error: <b>Could not Add Try again.</b>,
    });
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
      // generatePdf(name, QuizState.score);
      generatePdf(name, IQScre);
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
          sx: { ...textFieldStyles },
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
                display:'flex',
                justifyContent:"center"
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
                  width:'30%',
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
              {/* <Button
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
              </Button> */}
            </Stack>
            <BellCurveChart
              userIQ={IQScre}
              onChartRendered={handleChartRendered}
            />
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
    </Box>
  );
};

export default GQSuccessPage;
