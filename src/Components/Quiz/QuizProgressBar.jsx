import React from "react";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import {
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
} from "@mui/icons-material";

const QuizProgressBar = ({
  currentQuestion = 0,
  totalQuestions = 0,
  progressValue = 0,
  onPrevious,
  onNext,
}) => {
  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, color: "white" }}>
      <Box
        sx={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box width={20}>
          <Typography fontWeight={600} fontSize={14}>
            Q{currentQuestion}/{totalQuestions}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            aria-label="Previous question"
            sx={{ color: "white", backgroundColor: "#ffffff30" }}
            onClick={onPrevious}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            aria-label="Next question"
            sx={{ color: "white", backgroundColor: "#ffffff30" }}
            onClick={onNext}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </Box>

        <Box width={50}>
          <Typography fontWeight={700} fontSize={20}>
            {`${Math.floor(progressValue)}%`}
          </Typography>
        </Box>
      </Box>

      <LinearProgress
        sx={{
          height: "8px",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#FFDA55",
          },
        }}
        variant="determinate"
        value={Math.floor(progressValue)}
      />
    </Box>
  );
};

export default QuizProgressBar;
