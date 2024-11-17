import React from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { RewardCard } from "../../Common";
import { useNavigate } from "react-router-dom";
import { SuccessManSVG } from "../../assets";
import { useSelector } from "react-redux";

const ResultDialogBox = ({
  open,
  Score,
  handleReview,
  Level,
  handleDone
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const inLevel = Level;
  const navigate = useNavigate();
  const QuizState = useSelector((state) => state.QuizState);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  console.log("result :",QuizState.time);
  
  const cardData = [
    { title: "Answered", leftText:QuizState.score, coinValue:QuizState.score*2 },
    { title: "Time Taken", leftText: formatTime(QuizState.time), coinValue: (((QuizState?.questionsList.length*60)-QuizState.time)*1)},
    { title: "Total Coins Earned", coinValue: ((((QuizState?.questionsList.length*60)-QuizState.time)*1)+(QuizState.score*2))},
  ];

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          boxSizing: "border-box",
          border: "1px solid",
          borderColor: "#02216F",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isSm ? "16px" : "28px",
            padding: "2px",
          }}
        >
          You beat 56% of total players, great job. Keep practicing.
        </Typography>

        <Divider sx={{ bgcolor: "#FFDA55", height: "2px", width: "100%" }} />
        <Grid
          container
          spacing={3}
          sx={{
            padding: isSm ? "10px" : "30px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={SuccessManSVG}
              alt="Player image"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: isSm ? "200px" : "350px",
              }}
            />
            <Box sx={{ display: "flex", gap: 4, width: isSm ? null : "100%" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleReview}
                sx={{ ...buttonStyles("#FFDA55", "#02216F") }}
              >
                Review
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleDone}
                sx={{ ...buttonStyles("#FFDA55", "#02216F") }}
              >
                Done
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              gap={2}
            >
              {cardData.map((card, index) => (
                <RewardCard
                  key={index}
                  title={card.title}
                  leftText={card.leftText}
                  coinValue={card.coinValue}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

// Button style helper function
const buttonStyles = (bgColor, textColor) => ({
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: textColor,
  boxShadow: "2px 3px #02216F",
  borderRadius: "10px",
  textTransform: "none",
  border: "1px solid",
  borderColor: textColor,
  "&:hover": {
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(-5px)",
    boxShadow: "2px 3px #02216F",
  },
});

export default ResultDialogBox;
