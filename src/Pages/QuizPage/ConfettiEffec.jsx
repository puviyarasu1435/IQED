// ConfettiEffect.js
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Box } from "@mui/material";

const ConfettiEffect = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  useEffect(() => {
    // Start fading the confetti after 1 second
    const fadeOutTimer = setTimeout(() => {
      setConfettiOpacity(0);  // Start reducing opacity
    }, 6000);

    // Fully hide the confetti after 2 seconds (1 second for opacity transition)
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    // Clean up the timers when the component unmounts
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showConfetti && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transition: 'opacity 1s ease-in-out', // Smooth fade-out over 1 second
            opacity: confettiOpacity,
          }}
        >
          <Confetti
            width={width}
            height={height}
            gravity={0.1}
          />
        </Box>
      )}
    </>
  );
};

export default ConfettiEffect;
