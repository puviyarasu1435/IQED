import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Box, Button, TextField, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const PDFGenerator = () => {
  const [score, setScore] = useState('');
  const [name, setName] = useState('');
  const canvasRef = useRef(null);

  // Function to enter fullscreen mode
  const enterFullscreen = () => {
    const elem = document.documentElement; // The root element (entire document)
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

  // Function to exit fullscreen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Function to handle keydown events and prevent exiting fullscreen with Esc
  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault(); // Prevent default behavior for Escape key (exiting fullscreen)
    }
  };

  // Function to handle fullscreen changes
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      // Check if fullscreen was exited manually and force fullscreen again
      enterFullscreen();
    }
  };

  // Trigger fullscreen as soon as the component loads and add event listener for keydown
  useEffect(() => {
    enterFullscreen();
    document.addEventListener('keydown', handleKeydown); // Disable Escape key to exit fullscreen
    document.addEventListener('fullscreenchange', handleFullscreenChange); // Force fullscreen back if exited

    // Clean up the event listeners on unmount
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []); // This useEffect runs once, after the first render

  // Function to generate the bell curve chart
  const generateChart = () => {
    return new Promise((resolve) => {
      const ctx = canvasRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [-3, -2, -1, 0, 1, 2, 3],
          datasets: [
            {
              label: 'IQ Distribution',
              data: [1, 5, 15, 50, 15, 5, 1],
              fill: true,
              backgroundColor: 'rgba(0, 119, 204, 0.3)',
              borderColor: 'rgba(0, 119, 204, 1)',
              pointRadius: 0,
            },
            {
              label: 'User IQ',
              data: Array(7).fill(null).map((_, i) => (i === 5 ? score : null)),
              pointRadius: 5,
              pointBackgroundColor: 'red',
            }
          ],
        },
        options: {
          responsive: false,
          scales: {
            x: { display: false },
            y: { display: false }
          },
        },
      });
      setTimeout(resolve, 100); // Wait for chart to render
    });
  };

  // Function to generate and download the PDF
  const generatePdf = async () => {
    await generateChart();

    const chartImage = canvasRef.current.toDataURL('image/png');
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();

    page.drawText(`IQ Test Result`, { x: 50, y: height - 50, size: 20, color: rgb(0, 0, 0) });
    page.drawText(`Name: ${name}`, { x: 50, y: height - 100, size: 15, color: rgb(0, 0, 0) });
    page.drawText(`IQ Score: ${score}`, { x: 50, y: height - 130, size: 15, color: rgb(0, 0, 0) });

    const imageBytes = await fetch(chartImage).then(res => res.arrayBuffer());
    const chartImageEmbed = await pdfDoc.embedPng(imageBytes);
    page.drawImage(chartImageEmbed, {
      x: 50,
      y: height - 300,
      width: 500,
      height: 200,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_IQ_Test_Result.pdf`;
    link.click();
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Generate IQ Test Result PDF
      </Typography>
      <TextField
        label="Enter Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Enter Score"
        variant="outlined"
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generatePdf}
        sx={{ marginTop: 2 }}
      >
        Generate and Download PDF
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={exitFullscreen}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Exit Fullscreen
      </Button>
      <canvas ref={canvasRef} style={{ display: 'none' }} width={600} height={400}></canvas>
    </Box>
  );
};

export default PDFGenerator;
