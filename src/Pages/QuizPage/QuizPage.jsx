import { useParams } from "react-router-dom";

// mui
import { Box, Button } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { ResultDialogBox, Timer } from "../../Common";

// hook
import { useHandleQuizPage } from "../util";

import {
  LoadingScreen,
  QuestionBox,
  QuestionDrawerList,
  QuizProgressBar,
} from "../../Components";

const QuizPage = () => {
  const { sessionId } = useParams();
  const {
    quizState,
    sessionLoading,
    ResultDialog,
    isQuestionList,
    progressValue,
    timerRef,
    setisQuestionList,
    setResultDialog,
    handleOnPrevious,
    handleOnNext,
    handleQuit,
    handleSubmit,
  } = useHandleQuizPage(sessionId);

  if (sessionLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Timer
        ref={timerRef}
        initialTime={quizState?.questionsList.length * 60}
        start={!sessionLoading}
      />
      <QuestionDrawerList
        open={isQuestionList}
        handleClose={() => setisQuestionList(false)}
        quizData={quizState?.questionsList}
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
        index={quizState?.currentQuestionIndex}
        Question={quizState?.questionsList[quizState?.currentQuestionIndex]}
      />
      <QuizProgressBar
        currentQuestion={quizState?.currentQuestionIndex + 1}
        totalQuestions={quizState?.questionsList.length}
        progressValue={progressValue}
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
