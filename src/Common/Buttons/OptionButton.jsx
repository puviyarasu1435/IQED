import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { RabbitIMG } from "../../assets/Image";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../Redux/Slice/QuizSlice/QuizSlice";

const OptionButton = ({
  quiz,
  type = "text",
  content,
}) => {
  const QuizState = useSelector((state) => state.QuizState);
  const dispatch = useDispatch();

  return (
    <Box
      component={"button"}
      sx={{
        height: { xs: "5rem", lg: "8rem", md: "7rem" },
        width: "100%",
        display: "flex",
       
        backgroundColor: QuizState?.answeredQuestions[quiz._id] == content ? "#FFDA55" : "#02216F",
        boxShadow:QuizState?.answeredQuestions[quiz._id] == content ? "2px 3px #0b276b":null,
        color:  QuizState?.answeredQuestions[quiz._id] == content ? "#02216F" : "#ffffff",
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        border:'none',
        "&:hover": {
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(-1px)",
          backgroundColor: "#FFDA55",
          boxShadow: "2px 3px #0b276b",
          color:'#02216F'
        },
      }}
      onClick={()=>dispatch(answerQuestion({questionId:quiz._id, answer:content}))}
    >
      {type == "text" ? (
        <Typography fontWeight={700} fontSize={20}>{content}</Typography>
      ) : (
        <img src={content} width={100} height={100} alt="Option" />
      )}
    </Box>
  );
};

export default OptionButton;
