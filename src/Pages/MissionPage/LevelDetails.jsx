import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  StepConnector,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DaTa } from "./LevelDatas";
import { useCreateQuizSessionMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";

// Styled components
const StepCircle = styled("div")(({ theme, completed }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: completed ? "#FFD700" : "#FFF", // Change background for completed steps
  border: "2px solid #02216F",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#02216F",
  boxShadow: "2px 2px #02216F",
  fontFamily: "Suranna",
  cursor: "pointer",
}));

const StepIconRoot = styled("div")(({ theme }) => ({
  display: "flex",
  height: 22,
  alignItems: "center",
}));

function StepIcon(props) {
  const { completed, icon } = props;
  return (
    <StepIconRoot>
      <StepCircle completed={completed}>{icon}</StepCircle>
    </StepIconRoot>
  );
}

StepIcon.propTypes = {
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

// Custom connector for updating the line color based on completion
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: "#02216F", // Default color
    borderTopWidth: 3,
  },
  [`& .Mui-active .MuiStepConnector-line`]: {
    borderColor: "#FF5722", // Active step color
  },
  [`& .Mui-completed .MuiStepConnector-line`]: {
    borderColor: "yellow",
  },
}));

export default function LevelDetails(LevelData) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set([]));
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    const state = location.state;
    if (state) {
      const { passed, stepIndex } = state;
      if (passed) {
        setCompletedSteps((prev) => new Set(prev).add(stepIndex));
      }
    }
  }, [location.state]);

  const handleStepClick = async (stepIndex) => {
    setActiveStep(stepIndex);
    if(sessionStorage.getItem("UserId")){
      try {
        dispatch(resetQuiz())
        toast.promise(CreateQuizSession({
          "categoryName":"Geography",
          "hostId":sessionStorage.getItem("UserId")
        }
        ).unwrap(), {
          loading: "Creating Session...",
          success: (responce) => {
            navigate(`/Quiz/${responce.sessionId}`);
            return <b>session Created</b>;
          },
          error: <b>Could not Add Try again.</b>,
        });     
      } catch (error) {
        console.error("Failed to update quiz session:", error);
        toast.error("sorry session not save");
      }
    }else{
      toast.error("sessionStorage not found relogin");
    }
    
  };

  // Function to arrange steps into rows
  const arrangeSteps = (steps, stepsPerRow) => {
    const rows = [];
    for (let i = 0; i < steps.length; i += stepsPerRow) {
      const currentRow = steps.slice(i, i + stepsPerRow);
      // Check if the row index is even or odd
      if (Math.floor(i / stepsPerRow) % 2 === 0) {
        // Even index row - normal order
        rows.push(currentRow);
      } else {
        // Odd index row - reverse order
        rows.push(currentRow.reverse());
      }
    }
    return rows;
  };

  const setLevel = LevelData.LevelData;
  console.log("setLevel", setLevel);
  const currentLevelData = DaTa[setLevel - 1].categories;
  return (
    <Box>
      {currentLevelData.map((section, index) => {
        // Calculate stepRows for each section here
        const stepsPerRow = isSm ? 3 : 5;
        const stepRows = arrangeSteps(section.steps, stepsPerRow); // Use section.steps instead of DaTa[0].steps

        return (
          <Box key={index} p={isSm ? 0 : 4}>
            <Box
              sx={{
                textAlign: index % 2 === 0 ? "left" : "right",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "inline-block",
                  backgroundColor: "#FFD700",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  color: "#02216F",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  boxShadow: "2px 2px #02216F",
                  mb: 6,
                }}
              >
                {section.title}
              </Typography>
            </Box>
            <Grid container spacing={10}>
              {stepRows.map((row, rowIndex) => (
                <Grid item xs={12} key={rowIndex}>
                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<CustomConnector />}
                  >
                    {row.map((step, stepIndex) => {
                      const globalStepIndex =
                        rowIndex * stepsPerRow + stepIndex; // Calculate the correct index for navigation

                      // Calculate the correct icon number
                      let iconNumber;
                      if (rowIndex % 2 === 0) {
                        // Even row
                        iconNumber = globalStepIndex + 1; // Normal order
                      } else {
                        // Odd row
                        iconNumber = (rowIndex + 1) * stepsPerRow - stepIndex; // Reverse order
                      }

                      return (
                        <Step
                          key={step.label}
                          completed={completedSteps.has(globalStepIndex)}
                        >
                          <StepLabel
                            StepIconComponent={(props) => (
                              <StepIcon
                                {...props}
                                completed={completedSteps.has(globalStepIndex)}
                                icon={iconNumber} // Use the calculated icon number
                              />
                            )}
                            onClick={() => handleStepClick(globalStepIndex)} // Use the correct step index
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                color: "#02216F",
                              }}
                            >
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
