import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useUpdateUserStatsMutation } from "../../../Redux/RTK/AuthAPI/AuthAPI";
import {
  useGetQuizSessionByIdQuery,
  useUpdateQuizSessionMutation,
} from "../../../Redux/RTK/QuizAPI/QuizAPI";
import {
  nextQuestion,
  prevQuestion,
  setTimer,
  submitQuiz,
} from "../../../Redux/Slice/QuizSlice/QuizSlice";
import { UpdateUser } from "../../../Redux/Slice/UserSlice/UserSlice";

const useHandleQuizPage = (sessionId) => {
  const {
    data: sessionData,
    error: sessionError,
    isLoading: sessionLoading,
  } = useGetQuizSessionByIdQuery(sessionId);
  const [updateQuizSession] = useUpdateQuizSessionMutation();
  const [updateUserStats, { data }] = useUpdateUserStatsMutation();

  const UserData = useSelector((state) => state.UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizState = useSelector((state) => state.QuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const timerRef = useRef();


  useEffect(() => {
    if (sessionError) {
      toast.error("Session Expired");
      navigate("/missions");
    }
  }, [sessionError, navigate]);
  
  useEffect(() => {
    if( sessionData && (quizState?.questionsList.length == Object.keys(quizState.answeredQuestions).length)){
      toast.success("All Quiz Completed")
    }
  }, [quizState.answeredQuestions]);


  const handleOnPrevious = () => {
    dispatch(prevQuestion());
  };

  const handleOnNext = () => {
    dispatch(nextQuestion());
  };

  const handleQuit = (test = false) => {
    setResultDialog(false);
    document.exitFullscreen();
    if (test) {
      toast.success("Quiz Completed");
    } else {
      toast.error("Session Expire");
    }
    if(!sessionStorage.getItem["UserId"]){
      navigate("/missions");

    }else{
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    if(Object.keys(quizState.answeredQuestions).length<10){
      toast.error("Try to answer at least 10 IQ questions.")
      return false
    }

    timerRef.current.pauseTimer();
    const currentTime = timerRef.current.getCurrentTime();

    dispatch(submitQuiz());
    if (!sessionStorage.getItem("UserId")) {
      navigate("/result", { replace: true });
     
    } else {
      setResultDialog(true);

      dispatch(setTimer(currentTime));
      updateUserStats({
        userId: sessionData?.host,
        streakIncrement: 0,
        xpToAdd:
          (quizState?.questionsList.length * 60 - quizState.time) * 1 +
          quizState.score * 2,
        rankToUpdate: Math.floor(UserData.XP / 10000),
        iQGemsToAdd: 1,
      });
      dispatch(UpdateUser(data.user));
    }
    try {
      await updateQuizSession({
        sessionId,
        hostId: sessionData?.host, // Use the host ID from session data
        score: quizState.score,
        answeredQuestions: quizState.answeredQuestions,
        status: "completed",
      }).unwrap();
      toast.success("session Complated");
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
    document.exitFullscreen();
  };

  const progressValue =
    ((quizState?.currentQuestionIndex + 1) / quizState?.questionsList.length) *
    100;

  return {
    quizState,
    sessionError,
    sessionLoading,
    timerRef,
    isQuestionList,
    ResultDialog,
    progressValue,
    handleSubmit,
    handleQuit,
    handleOnNext,
    handleOnPrevious,
    setisQuestionList,
    setResultDialog
  };
};

export default useHandleQuizPage;
