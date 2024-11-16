import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useCreateQuizSessionMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";
import { useNavigate } from "react-router-dom";
import {LetsGo, one, two, three, countdownSound, letsGoSound  } from "../../assets";
import gsap from "gsap";
const Quizloader = () => {
  const enterFullscreen = () => {
    const elem = document.documentElement; 
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  // Start countdown from 3
  const [countdown, setCountdown] = useState(3);
  const [showQuizPage, setShowQuizPage] = useState(false);
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countdownRef = useRef(null);

  useEffect(() => {
    enterFullscreen();
  }, []);
  useEffect(() => {
    const playSound = (num) => {
      let audio;
      if (num > 0) {
        audio = new Audio(countdownSound);
      } else if (num === 0) {
        audio = new Audio(letsGoSound);
      }
      
      if (audio) {
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
      }
    };

    if (countdown >= 0) {
      playSound(countdown);

      // GSAP animation for countdown effect
      if (countdownRef.current) {
        gsap.fromTo(
          countdownRef.current,
          { scale: 0, opacity: 0 },  // start at 0 scale and opacity
          { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" } // animate to full scale and opacity
        );
      }

      // Delay before showing the next countdown number
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1300);
   
      return () => clearTimeout(timer);
    } else {
      setShowQuizPage(true);
    }
  }, [countdown]);

 
  // Function to get the illustrated number based on countdown
  const getIllustratedNumber = (num) => {
    switch (num) {
      case 3:
        return <img ref={countdownRef} src={three} alt="3" />;
      case 2:
        return <img ref={countdownRef} src={two} alt="2" />;
      case 1:
        return <img ref={countdownRef} src={one} alt="1" />;
      case 0:
        return <img ref={countdownRef} src={LetsGo} alt="Lets Go" />;
      default:
        return null;
    }
  };
 const handleQuizCraetion = () => {
    try {
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({
          categoryName: "Geography",
          hostId: "6736b861b254c95e3de18308",
        }).unwrap(),
        {
          loading: "Creating Session...",
          success: (responce) => {
            navigate(`/quiz/${responce.sessionId}`,{ replace: true });
            return <b>session Created</b>;
          },
          error: (e) => {
            console.log(e)
            return e;
          },
        }
      );
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
};
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown === 0) {
        handleQuizCraetion();
      }
    }, 1000);
    
  }, [countdown]);

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
