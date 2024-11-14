import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Button,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import gsap from "gsap";
import { SVGLoader, VS } from "../../../assets";
const MatchLobby = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [guest, setGuest] = useState(true);
  const [joinCode, setJoinCode] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const correctCode = "12345"; 
  const stepRef = useRef(null);
  const joinCodeRef = useRef(null);
  const nameInputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (joinCodeRef.current && nameInputRef.current && buttonRef.current) {
     
      gsap.fromTo(
        [joinCodeRef.current, nameInputRef.current, buttonRef.current],
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
      );

    
      gsap.fromTo(
        buttonRef.current,
        { rotation: -10 },
        { rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

   
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { x: step === 1 ? -200 : 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [step]); 

  const handleNextClick = () => {
    if (step === 1) {
      setLoading(true);
      setError("");

      setTimeout(() => {
        setLoading(false);
        if (joinCode === correctCode) {
          setStep(2);
        } else {
          setError("Incorrect code. Please try again.");
        }
      }, 1000);
    } else {
      console.log("Name:", name, "Join Code:", joinCode);
      setGuest(false);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
      <Box
        sx={{
          flex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#1A49BA",
          color: "#FFFFFF",
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mb: 1 }}>P1</Avatar>
        <Typography variant="h5">Player 1</Typography>
        <Typography variant="body2">Score: 0</Typography>
      </Box>

      {/* "VS" Divider with larger SVG Image */}
      <Divider
        orientation={isSm ? "horizontal" : "vertical"}
        flexItem
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": { borderColor: "#1A49BA", borderWidth: "3px" },
          "&::after": { borderColor: "#FFDA55", borderWidth: "3px" },
          mx: isSm ? 0 : 2,
          my: isSm ? 2 : 0,
        }}
      >
        <img
          src={VS}
          alt="VS"
          style={{
            width: isSm ? 100 : 250,
            height: isSm ? 100 : 250,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Divider>

      

      {/* Player 2 Section */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFDA55",
          color: "#02216F",
        }}
      >
        <Avatar sx={{ width: 80, height: 80, mb: 1 }}>P2</Avatar>
        <Typography variant="h5">Player 2</Typography>
        <Typography variant="body2">Score: 0</Typography>
      </Box>
      {!guest ? (
        <Card
          sx={{
            maxWidth: isSm ? null : 450,
            width: "100%",
            position: isSm ? "relative" : "fixed",
            bottom: isSm ? "auto" : 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            border: "2px solid",
            borderColor: "#02216F",
            boxShadow: "3px 4px #02216F",
            borderRadius: isSm ? null : "20px",
            boxSizing: "border-box",
            // p:'10px'
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", color: "#02216F" }}
              gutterBottom
            >
              Ask your friends to
            </Typography>
            <Divider
              sx={{
                bgcolor: "#FFDA55",
                mb: "10px",
                height: "2px",
                width: "100%",
              }}
            />
            <Typography sx={{ fontWeight: "bold" }} gutterBottom>
              1. Use any device to open
            </Typography>
            <Box
              sx={{
                p: "5px",
                width: "60%",
                boxSizing: "border-box",
                bgcolor: "white",
                border: "2px solid",
                borderColor: "#02216F",
                borderRadius: "10px",
                color: "#02216F",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "#02216F" }}>
                learn.iqed.in/join
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: "bold" }} gutterBottom>
              2. Enter game code
            </Typography>
            <Box
              sx={{
                p: "5px",
                width: "60%",
                boxSizing: "border-box",
                bgcolor: "white",
                border: "2px solid",
                borderColor: "#02216F",
                borderRadius: "10px",
                color: "#02216F",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "#02216F" }}>
                123456
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#FFDA55",
                color: "#02216F",
                boxShadow: "2px 3px white",
                borderRadius: { xs: "5px", md: "10px" },
                textTransform: "none",
                border: "2px solid",
                borderColor: "#02216F",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "black",
                },
              }}
            >
              Start
            </Button>
          </CardActions>
        </Card>
      ) : (
        <></>
      )}
      <Dialog
        open={guest}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px", 
            width: { xs: "90%", sm: "80%", md: "100%" }, 
            maxWidth: "600px", 
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#FFDA55",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              px: "15px",
              py: "5px",
              color: "#02216F",
              fontSize: { xs: "25px", md: "20px", lg: "30px" },
              fontWeight: "bold",
            }}
          >
            Welcome to <b>IQED’s</b> <br /> 1v1 Duel Challenge Lobby! <br />
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#FFDA55",
          }}
        >
          <Box
            sx={{
              bgcolor: "#02216F",
              borderRadius: "20px",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "16px", md: "24px" },
                fontWeight: "bold",
                p: "10px",
              }}
            >
              Let the battle of wits begin!
            </Typography>
            <Divider sx={{ bgcolor: "#FFDA55", mb: "3%" }} />

            <Box
              sx={{
                p: { xs: "5%", md: "5%" },
                color: "#fff",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexGrow: 1,
                  p: "10px",
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  gap: "20px",
                }}
                ref={stepRef} // Attach GSAP animation reference
              >
                {step === 1 ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: { xs: "5px", md: "10px" },
                      padding: "5px 10px",
                      border: "1px solid",
                      borderColor: error ? "red" : "white",
                      height: "50px",
                      boxShadow: error ? "2px 3px red" : "2px 3px white",
                    }}
                    ref={joinCodeRef}
                  >
                    <input
                      placeholder={error ? error : "Enter a join code"}
                      value={joinCode}
                      onChange={(e) => {
                        setJoinCode(e.target.value);
                        setError(""); // Clear error when typing
                      }}
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                        color: error ? "red" : "black",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: { xs: "5px", md: "10px" },
                      padding: "5px 10px",
                      border: "1px solid",
                      borderColor: "white",
                      height: "50px",
                      boxShadow: "2px 3px white",
                    }}
                    ref={nameInputRef}
                  >
                    <input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    />
                  </Box>
                )}
                <Button
                  onClick={handleNextClick}
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { md: "24px" },
                    backgroundColor: "#FFDA55",
                    color: "#02216F",
                    boxShadow: "2px 3px white",
                    borderRadius: { xs: "5px", md: "10px" },
                    textTransform: "none",
                    border: "1px solid",
                    borderColor: "white",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "black",
                      transform: "translateY(-5px)",
                      transition: "transform 0.3s ease-in-out",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  ref={buttonRef}
                  disabled={loading}
                >
                  {loading ? (
                    <SVGLoader size={40} />
                  ) : step === 1 ? (
                    "Next"
                  ) : (
                    "Join"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MatchLobby;

export const OnLoadLobby = () => {
  const matchData = JSON.parse(sessionStorage.getItem("MatchData"));
  if (matchData) {
    return "User";
  } else {
    return "Guest";
  }
};