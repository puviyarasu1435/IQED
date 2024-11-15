import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useCreateQuizSessionMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";




// import { LetsGo, one, two, three } from "../../../assets";

const Quizloader = () => {


  // Start countdown from 3
  const [countdown, setCountdown] = useState(3);
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (countdown >= 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Clean up on component unmount
    } else {
      // Show QuizPage after countdown completes
      if (sessionStorage.getItem("UserId")) {
        try {
          dispatch(resetQuiz());
          toast.promise(
            CreateQuizSession({
              categoryName: "Geography",
              hostId: sessionStorage.getItem("UserId"),
            }).unwrap(),
            {
              loading: "Creating Session...",
              success: (responce) => {
                navigate(`quiz/${responce.sessionId}`);
                return <b>session Created</b>;
              },
              error: <b>Could not Add Try again.</b>,
            }
          );
        } catch (error) {
          console.error("Failed to update quiz session:", error);
          toast.error("sorry session not save");
        }
      } else {
        toast.error("sessionStorage not found relogin");
      }
    }
  }, [countdown]);

  // Function to get the illustrated number based on countdown
  const getIllustratedNumber = (num) => {
    switch (num) {
      case 3:
        return <img src={three} alt="3" />;
      case 2:
        return <img src={two} alt="2" />;
      case 1:
        return <img src={one} alt="1" />;
      case 0:
        return <img src={LetsGo} alt="LetsGo" />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* {getIllustratedNumber(countdown)} */}
      </Box>
    </Box>
  );
};

export default Quizloader;
