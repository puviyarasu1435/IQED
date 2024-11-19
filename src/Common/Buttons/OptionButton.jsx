import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, nextQuestion } from "../../Redux/Slice/QuizSlice/QuizSlice";

const OptionButton = ({ quiz, type = "text", content }) => {
  const QuizState = useSelector((state) => state.QuizState);
  const dispatch = useDispatch();

  // Determine the button background and text color based on the quiz state
  const isAnswered = QuizState?.answeredQuestions[quiz._id] === content;
  const isCorrectAnswer = quiz?.correctAnswer === content;
  const isLive = QuizState?.isLive;

  // Set colors based on conditions
  const backgroundColor = isAnswered && !isLive && isCorrectAnswer
    ? "#19ff95" 
    : isAnswered
    ? "#ff6334"
    : isCorrectAnswer && !isLive
    ? "#81f319ba" 
    : "#02216F"; 
  const color = isAnswered || (isCorrectAnswer && !isLive)
    ? "#02216F" 
    : "#ffffff"; 
    
  return (
    <Box
      component={"button"}
      sx={{
        height: { xs: "5rem", lg: "7rem", md: "6rem" },
        width: "100%",
        display: "flex",
        backgroundColor:!isLive ? backgroundColor: isAnswered?"#FFDA55":"#02216F" ,
        color,
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        border: 'none',
      
        boxShadow: isAnswered ? "2px 3px #0b276b" : null,
        "&:hover": {
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(-1px)",
          backgroundColor: "#FFDA55",
          boxShadow: "2px 3px #0b276b",
          color: "#02216F",
        },
      }}
      disabled={!isLive}
      onClick={() => {
        dispatch(nextQuestion());
        dispatch(answerQuestion({ questionId: quiz._id, answer: content }));
      }}
    >
      {type === "text" ? (
        <Typography fontWeight={700} fontSize={20}>{content}</Typography>
      ) : (
        <img src={content} width={110} height={100} alt="Option" />
      )}
    </Box>
  );
};

export default OptionButton;
