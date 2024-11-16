import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';

// Register Chart.js modules and the annotation plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

// Function to generate data points for a normal distribution (bell curve)
const generateBellCurveData = (mean, stdDev, min, max, step = 1) => {
  const data = [];
  for (let x = min; x <= max; x += step) {
    const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    data.push({ x, y });
  }
  return data;
};

const BellCurveChart = ({ userIQ }) => {
    const mean = 100;
    const stdDev = 15;
    const minIQ = 55;
    const maxIQ = 145;
  
    // Generate data for the bell curve
    const bellCurveData = generateBellCurveData(mean, stdDev, minIQ, maxIQ).map(
      (point) => point.y * 100 // Scale y-values for visibility
    );
  
    // Chart.js data and options
    const data = {
      labels: Array.from({ length: maxIQ - minIQ + 1 }, (_, i) => i + minIQ),
      datasets: [
        {
          label: "IQ Distribution",
          data: bellCurveData,
          fill: true,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",  // Same color as border
          tension: 0.4,
        },
        {
          label: "Your IQ",
          data: Array(maxIQ - minIQ + 1).fill(null),
          pointRadius: 5,
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          fill: false,
          tension: 0,
        },
      ],
    };
  
    // Add user's IQ point
    const userIndex = userIQ - minIQ;
    if (userIndex >= 0 && userIndex < bellCurveData.length) {
      data.datasets[1].data[userIndex] = bellCurveData[userIndex];
    }
  
    // Get the y-value of the bell curve at the user's IQ
    const userYValue = bellCurveData[userIndex];
  
    // Chart options with annotations
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (context) => `IQ: ${context.label}, Score: ${context.raw.toFixed(2)}%`,
          },
        },
        annotation: {
          annotations: {
            userIQLine: {
              type: 'line',
              xMin: userIQ,
              xMax: userIQ,
              yMin: 0,
              yMax: userYValue,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                content: `Your IQ: ${userIQ}`,
                enabled: true,
                position: "top",
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "IQ Score",
          },
        },
        y: {
          title: {
            display: true,
            text: "Probability (%)",
          },
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  
  
  

export default BellCurveChart;
