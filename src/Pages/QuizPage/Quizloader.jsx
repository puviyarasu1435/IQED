import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useCreateQuizSessionMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";
import { useNavigate } from "react-router-dom";
import { LetsGo, one, two, three, countdownSound, letsGoSound } from "../../assets";
import gsap from "gsap";
const audiosound = new Audio(countdownSound);
const Quizloader = () => {
  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  // Countdown state
  const [countdown, setCountdown] = useState(3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countdownRef = useRef(null);
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  
  useEffect(() => {
    enterFullscreen();
  }, []);

  const playSound = (num) => {
 
    // if (num > 0) {
    //   audio = new Audio(countdownSound);
    // } else if (num === 0) {
    //   audio = new Audio(letsGoSound);
    // }

    if (audiosound) {
      audiosound.volume = 0.5;
      audiosound.play();
    }
  };

  const handleQuizCreation = async () => {
    try {
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({
          categoryName: "IQTEST",
          hostId: "6736b861b254c95e3de18308",
        }).unwrap(),
        {
          loading: "Creating Session...",
          success: (response) => {
            navigate(`/quiz/${response.sessionId}`, { replace: true });
            return <b>Session Created</b>;
          },
          error: (e) => {
            console.error(e);
            return "Failed to create session.";
          },
        }
      );
    } catch (error) {
      console.error("Failed to create quiz session:", error);
      toast.error("Sorry, session not saved.");
    }
  };

  useEffect(() => {
    if (countdown < 0) {
      handleQuizCreation();
      return;
    }

    playSound(countdown);

    if (countdownRef.current) {
      gsap.fromTo(
        countdownRef.current,
        { scale: 0, opacity: 0 }, // start
        { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" } // end
      );
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const getIllustratedNumber = (num) => {
    switch (num) {
      case 3:
        return <img ref={countdownRef} src={three} alt="3" />;
      case 2:
        return <img ref={countdownRef} src={two} alt="2" />;
      case 1:
        return <img ref={countdownRef} src={one} alt="1" />;
      case 0:
        return <img ref={countdownRef} src={LetsGo} alt="Let's Go" />;
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
        {getIllustratedNumber(countdown)}
      </Box>
    </Box>
  );
};

export default Quizloader;
