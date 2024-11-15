import { Box, Button } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { ResultDialogBox, Timer } from "../../Common";
import { useDispatch, useSelector } from "react-redux";
import {
  answerQuestion,
  nextQuestion,
  prevQuestion,
  setQuestions,
  setTimer,
  submitQuiz,
} from "../../Redux/Slice/QuizSlice/QuizSlice";
import {
  QuestionBox,
  QuestionDrawerList,
  QuizProgressBar,
} from "../../Components";
import {
  useGetQuizSessionByIdQuery,
  useUpdateQuizSessionMutation,
} from "../../Redux/RTK/QuizAPI/QuizAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  useGetUserByIdQuery,
  useUpdateUserStatsMutation,
} from "../../Redux/RTK/AuthAPI/AuthAPI";
import { UpdateUser } from "../../Redux/Slice/UserSlice/UserSlice";

const QuizPage = () => {
  const { sessionId } = useParams();
  const {
    data: sessionData,
    error,
    isLoading,
  } = useGetQuizSessionByIdQuery(sessionId);
  const [updateQuizSession] = useUpdateQuizSessionMutation();
  const [updateUserStats, { data }] = useUpdateUserStatsMutation();

  const UserData = useSelector((state) => state.UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const QuizState = useSelector((state) => state.QuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const startTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const getTimeRef = useRef(null);

  if (error) {
    toast.error("session Expire");
    navigate("/missions");
    return <></>;
  }

  useEffect(() => {
      startTimerRef.current();
  }, []);

  const handleOnPrevious = () => {
    dispatch(prevQuestion());
  };

  const handleOnNext = () => {
    dispatch(nextQuestion());
  };

  const handleQuit = (test = false) => {
    setResultDialog(false);
    if (test) {
      toast.success("Quiz Completed");
    } else {
      toast.error("Session Expire");
    }
    navigate("/missions");
  };

  const handleSubmit = async () => {
    if (!sessionStorage.getItem("UserId")) {
      navigate("/missions");
    }
    dispatch(submitQuiz());
    setResultDialog(true);
    pauseTimerRef.current();
    dispatch(setTimer(getTimeRef.current()));

    updateUserStats({
      userId: sessionData?.host,
      streakIncrement: 0,
      xpToAdd:(QuizState?.questionsList.length * 60 - QuizState.time) * 1 +
QuizState.score * 2,
      rankToUpdate: Math.floor(UserData.XP / 10000),
      iQGemsToAdd: 1,
    });
    dispatch(UpdateUser(data.user));
    try {
      await updateQuizSession({
        sessionId,
        hostId: sessionData?.host, // Use the host ID from session data
        score: QuizState.score,
        answeredQuestions: QuizState.answeredQuestions,
        status: "completed",
      }).unwrap();
      toast.success("session Complated");
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
  };

  const progressValue =((QuizState?.currentQuestionIndex + 1) / QuizState?.questionsList.length) *100;



  return (
    <Box sx={{ height: "100%" }}>
      <Timer
        initialTime={QuizState?.questionsList.length * 60}
        onTimeUp={() => handleSubmit()}
        startTimerProp={(startFn) => (startTimerRef.current = startFn)}
        pauseTimerProp={(pauseFn) => (pauseTimerRef.current = pauseFn)}
        resetTimerProp={(resetFn) => (resetTimerRef.current = resetFn)}
        getTimeProp={(getTime) => (getTimeRef.current = getTime)}
      />
      <QuestionDrawerList
        open={isQuestionList}
        handleClose={() => setisQuestionList(false)}
        quizData={QuizState?.questionsList}
        handleSubmit={handleSubmit}
        handleQuit={() => handleQuit()}
      />
      <Button
        sx={{
          position: "fixed",
          left: "-2px",
          top: { lg: "40%", md: "35%", xs: "5%" },
          height: "50px",
          backgroundColor: "#ffffff30",
          color: "white",
        }}
        onClick={() => {
          setisQuestionList(true);
        }}
      >
        <KeyboardDoubleArrowRight />
      </Button>
      <QuestionBox
        index={QuizState?.currentQuestionIndex}
        Question={QuizState?.questionsList[QuizState?.currentQuestionIndex]}
      />
      <QuizProgressBar
        currentQuestion={QuizState?.currentQuestionIndex + 1}
        totalQuestions={QuizState?.questionsList.length}
        progressValue={progressValue} // Using dynamically calculated progress value
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
      />
      <ResultDialogBox
        open={ResultDialog}
        handleReview={() => setResultDialog(false)}
        handleDone={() => handleQuit(true)}
      />
    </Box>
  );
};

export default QuizPage;

export const QuizPageloder = () => {
  return true;
};
