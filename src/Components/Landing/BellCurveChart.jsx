import React, { useEffect, useRef, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const generateBellCurveData = (mean, stdDev, min, max, step = 1) => {
  const data = [];
  for (let x = min; x <= max; x += step) {
    const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    data.push({ x, y });
  }
  return data;
};

const BellCurveChart = React.memo(({ userIQ, onChartRendered }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // To store the Chart.js instance
  const mean = 100;
  const stdDev = 15;
  const minIQ = 55;
  const maxIQ = 145;

  const bellCurveData = useMemo(
    () => generateBellCurveData(mean, stdDev, minIQ, maxIQ).map((point) => point.y * 100),
    [mean, stdDev, minIQ, maxIQ]
  );

  const data = useMemo(() => {
    const chartData = {
      labels: Array.from({ length: maxIQ - minIQ + 1 }, (_, i) => i + minIQ),
      datasets: [
        {
          label: "IQ Distribution",
          data: bellCurveData,
          fill: true,
          borderColor: "White",
          backgroundColor: "white",
          tension: 0.4,
        },
        {
          label: "Your IQ",
          data: Array(maxIQ - minIQ + 1).fill(null),
          pointRadius: 10,
          pointBackgroundColor: "#ffc400 ",
          borderColor: "#ffc400",
          backgroundColor: "#ffc400",
          fill: false,
          tension: 0,
        },
      ],
    };

    const userIndex = userIQ - minIQ;
    if (userIndex >= 0 && userIndex < bellCurveData.length) {
      chartData.datasets[1].data[userIndex] = bellCurveData[userIndex];
    }
    return chartData;
  }, [userIQ, bellCurveData, minIQ, maxIQ]);

  const options = useMemo(() => {
    const userIndex = userIQ - minIQ;
    const userYValue = bellCurveData[userIndex];

    return {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white",
            font: { size: 18, weight: "bold" },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `IQ: ${context.label}, Score: ${context.raw.toFixed(2)}%`,
          },
        },
        annotation: {
          annotations: {
            userIQLine: {
              type: "line",
              xMin: userIQ,
              xMax: userIQ,
              yMin: 0,
              yMax: userYValue,
              borderColor: "#ffc400",
              borderWidth: 2,
              label: {
                content: `Your IQ: ${userIQ}`,
                enabled: true,
                position: "top",
                color: "White",
                font: { size: 18, weight: "bold" },
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
            color: "White",
            font: { size: 16, weight: "bold" },
          },
          ticks: { color: "white" },
          grid: { color: "white" },
        },
        y: {
          title: {
            display: true,
            text: "Probability (%)",
            color: "White",
            font: { size: 16, weight: "bold" },
          },
          ticks: { color: "white" },
          grid: { color: "white" },
        },
      },
    };
  }, [userIQ, bellCurveData, minIQ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy existing chart before creating a new one
    }
    const ctx = canvas.getContext("2d");
    chartRef.current = new ChartJS(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    if (onChartRendered) {
      const imageData = canvas.toDataURL("image/png");
      onChartRendered(imageData);
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, options, onChartRendered]);

  return <canvas ref={canvasRef} width={500} height={300} style={{ display: "none" }} />;
});

export default BellCurveChart;
