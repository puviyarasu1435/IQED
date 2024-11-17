import { Box, Typography } from "@mui/material";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Timer = forwardRef(({ start, initialTime }, ref) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (start) setIsRunning(true);
  }, [start]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useImperativeHandle(ref, () => ({
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => setTime(initialTime),
    startTimer: () => setIsRunning(true),
    getCurrentTime: () => time,
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: "fixed",
        top: "5%",
        right: "5%",
      }}
      gap={1}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "800",
          letterSpacing: "5px",
          fontSize: "24px",
          color: "white",
        }}
      >
        {formatTime(time)}
      </Typography>
    </Box>
  );
});

Timer.displayName = "Timer";

export default Timer;
