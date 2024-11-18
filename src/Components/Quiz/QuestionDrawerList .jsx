import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionIndex } from "../../Redux/Slice/QuizSlice/QuizSlice";

export default function QuestionDrawerList({
  open,
  handleClose,
  quizData = [],
  answeredQuestions = [],
  currentQuestionIndex,
  handleQuizListClick,
  handleSubmit,
  handleQuit,
}) {
  const getBackgroundColor = (index) => {
    if (answeredQuestions.includes(index)) return "#BFFFE2";
    if (index === currentQuestionIndex) return "#FFEDAC";
    return "#c5c5c5";
  };
  const dispatch = useDispatch();
  const getBorderColor = (index) => {
    if (answeredQuestions.includes(index)) return "1px solid #1DC77B";
    if (index === currentQuestionIndex) return "1px solid #FFDA55";
    return "";
  };
  const QuizState = useSelector((state) => state.QuizState);

 

  const DrawerList = useMemo(
    () => (
      <Box
        sx={{
          width: 350,
          zIndex: 99999,
        }}
        role="presentation"
        onClick={handleClose}
      >
        <Box sx={{ p: 2, display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <Typography fontWeight={800}>IQ TEST</Typography>
          <Button onClick={handleClose}>close</Button>
        </Box>
        <Divider />
        <Box
          sx={{
            bgcolor: "white",
            height: "80%", // Adjusted height to make space for buttons
            borderRadius: "0 0 20px 20px",
            p: 2,
          }}
        >
          <List>
            {quizData.map((quiz, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor:QuizState.answeredQuestions[quiz._id]?"#BFFFE2":"#c5c5c5",
                  border: getBorderColor(index),
                  borderRadius: "10px",
                  mt: 1,
                  "&:hover": {
                    bgcolor:
                      index === currentQuestionIndex ? "#FFEDAC" : "#e0e0e0",
                    cursor: "pointer",
                  },
                }}
                onClick={() => dispatch(setQuestionIndex(index))}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {`Quiz ${index + 1}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" fontWeight="400">
                      {quiz.question}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            
          </List>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p:1,
          }}
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: "100%" }}
          >
            Submit
          </Button>
          {/* <Button
            variant="outlined"
            color="error"
            onClick={handleQuit}
            sx={{ width: "100%" }}
          >
            Leave
          </Button> */}
        </Box>
        </Box>

      </Box>
    ),
    [
      quizData,
      answeredQuestions,
      currentQuestionIndex,
      handleClose,
      handleQuizListClick,
      handleSubmit,
      handleQuit,
    ]
  );

  return (
    <Drawer sx={{
      "& .MuiDrawer-paper": {
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      },
    }} open={open} onClose={handleClose}>
      {DrawerList}
    </Drawer>
  );
}
