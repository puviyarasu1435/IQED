import { Box, Button } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Timer } from "../../Common";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, nextQuestion, prevQuestion, setQuestions } from "../../Redux/Slice/QuizSlice/QuizSlice";
import { useGetQuestionsByCategoryQuery } from "../../Redux/RTK/QuizAPI/QuizAPI";
import { QuestionBox, QuestionDrawerList, QuizProgressBar } from "../../Components";

const QuizPage = () => {
  const { data, isLoading, isError } = useGetQuestionsByCategoryQuery();
  const dispatch = useDispatch();
  const QuizState = useSelector((state) => state.QuizState);
  const [Open, setOpen] = useState(false);
  const startTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const resetTimerRef = useRef(null);

   // use 'data' instead of 'isLoading' to avoid unnecessary updates

  const handleOnPrevious = () => {
    dispatch(prevQuestion());
  };

  const handleOnNext = () => {
    dispatch(nextQuestion());
    console.log(QuizState);
  };

  if (isLoading) return <p>Loading questions...</p>;

  // Dynamically calculate progress value
  const progressValue = ((QuizState?.currentQuestionIndex + 1) / QuizState?.questionsList.length) * 100;

  return (
    <Box sx={{ height: "100%" }}>
      <Timer
        initialTime={120}
        onTimeUp={() => alert("Time's up!")}
        startTimerProp={(startFn) => (startTimerRef.current = startFn)}
        pauseTimerProp={(pauseFn) => (pauseTimerRef.current = pauseFn)}
        resetTimerProp={(resetFn) => (resetTimerRef.current = resetFn)}
      />
      <QuestionDrawerList
        open={Open}
        handleClose={() => setOpen(false)}
        quizData={QuizState?.questionsList}
      />
      <Button
        sx={{
          position: "fixed",
          left: "-2px",
          top: "40%",
          height: "50px",
          backgroundColor: "#ffffff30",
          color: "white",
        }}
        onClick={() => {
          setOpen(true);
          console.log(QuizState);
        }}
      >
        <KeyboardDoubleArrowRight />
      </Button>
      <QuestionBox index={QuizState?.currentQuestionIndex} Question={QuizState?.questionsList[QuizState?.currentQuestionIndex]} />
      <QuizProgressBar
        currentQuestion={QuizState?.currentQuestionIndex + 1}
        totalQuestions={QuizState?.questionsList.length}
        progressValue={progressValue} // Using dynamically calculated progress value
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
      />
    </Box>
  );
};

export default QuizPage;
