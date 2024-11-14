// Timer.jsx
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Timer = ({ initialTime = 60, onTimeUp, startTimerProp, pauseTimerProp, resetTimerProp }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Starts the timer
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  // Pauses the timer
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  // Resets the timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(initialTime);
    setIsActive(false);
  };

  // Formats time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Expose start, pause, and reset functions to the parent component
  useEffect(() => {
    if (startTimerProp) startTimerProp(startTimer);
    if (pauseTimerProp) pauseTimerProp(pauseTimer);
    if (resetTimerProp) resetTimerProp(resetTimer);
  }, [startTimerProp, pauseTimerProp, resetTimerProp]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: 'fixed',
        top: '5%',
        right: '5%',
      }}
      gap={1}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "800",
          letterSpacing: "5px",
          fontSize: "24px",
          color: 'white',
        }}
      >
        {formatTime(time)}
      </Typography>
    </Box>
  );
};

export default Timer;
