import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setQuestionIndex } from "../../Redux/Slice/QuizSlice/QuizSlice";

export default function QuestionDrawerList({
  open,
  handleClose,
  quizData = [],
  answeredQuestions = [],
  currentQuestionIndex,
  handleQuizListClick,
  handleSubmit,
  handleLeave,
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

  const DrawerList = useMemo(
    () => (
      <Box
        sx={{ width: 300, zIndex: 99999 }}
        role="presentation"
        onClick={handleClose}
      >
        <Box sx={{ p: 2, fontWeight: "bold" }}>
          <Typography>Topic Name</Typography>
          <Typography>Unit Name</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            bgcolor: "white",
            height: "80%", // Adjusted height to make space for buttons
            borderRadius: "0 0 20px 20px",
            overflowY: "auto",
            p: 1,
          }}
        >
          <List>
            {quizData.map((quiz, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: getBackgroundColor(index),
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection:'column',
            p: 2,
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
          <Button
            variant="outlined"
            color="error"
            onClick={handleLeave}
            sx={{ width: "100%" }}
          >
            Leave
          </Button>
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
      handleLeave,
    ]
  );

  return (
    <Drawer open={open} onClose={handleClose}>
      {DrawerList}
    </Drawer>
  );
}
