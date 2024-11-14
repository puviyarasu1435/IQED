import React, { useEffect, useRef } from 'react';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import { gsap } from 'gsap';

const LoadingScreen = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.children;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    gsap.set(letters, { opacity: 0 });

    tl.to(letters, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
    });
  }, []);

  const colors = ['#02216F', '#FFDA55'];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"  
      height="100%" 
    >
      <Box ref={textRef} display="flex" gap={1}>
        {['I', 'Q', 'E', 'D'].map((letter, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <Typography
              variant="h2"
              component="span"
              sx={{
                fontWeight: 'bold',
                color: '#02216F',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                textShadow: `
                  -1px -1px 0 #02216F,
                  1px -1px 0 #02216F,
                  -1px 1px 0 #02216F,
                  1px 1px 0 #02216F,
                  0 0 2px #02216F`,
              }}
            >
              {letter}
            </Typography>

            <Typography
              variant="h2"
              component="span"
              sx={{
                fontWeight: 'bold',
                color: colors[index % colors.length],
                position: 'relative',
                zIndex: 2,
                textShadow: '3px 4px 3px rgba(0, 0, 0, 0.3)',
              }}
            >
              {letter}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
