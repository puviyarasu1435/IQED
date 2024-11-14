import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Icon for success
import { AI_Icon, feedback } from "../../assets";

const FeedBack = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Form State
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Error State
  const [errors, setErrors] = useState({
    feedbackType: false,
    feedbackText: false,
  });

  // Handle file upload for screenshots
  const handleFileUpload = (event) => {
    const files = event.target.files;
    let updatedScreenshots = [...screenshots];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.size < 2 * 1024 * 1024) {
        if (updatedScreenshots.length < 3) {
          updatedScreenshots.push(file);
        } else {
          alert("You can upload a maximum of 3 screenshots.");
          break;
        }
      } else {
        alert("File size should be below 2MB");
      }
    }

    setScreenshots(updatedScreenshots);
  };

  // Form validation and submission
  const handleSubmit = () => {
    // Reset errors
    setErrors({ feedbackType: false, feedbackText: false });

    // Check for empty fields and minimum character count
    if (!feedbackType || !feedbackText || feedbackText.length < 50) {
      setErrors({
        feedbackType: !feedbackType,
        feedbackText: !feedbackText || feedbackText.length < 50,
      });
      return;
    }

    // Simulate form submission (e.g., API call)
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);

      // Reset form after successful submission
      setFeedbackType("");
      setFeedbackText("");
      setScreenshots([]);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 3000);
    }, 2000); // Simulate a 2-second delay for submission
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        gap: "20px",
        overflow: "hidden",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          gap: isSm ? "10px" : "20px",
          bgcolor: "#1A49BA",
          boxSizing: "border-box",
          p: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant={isSm ? "h6" : "h4"}
          sx={{
            color: "White",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Submit Your Feedback!
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "White",
            fontWeight: 400,
          }}
        >
          Help us improve by sharing your feedback. Found a bug? Have a
          suggestion? Share your thoughts below.
          {isSm ? null : <br />} Earn **100 IQ Coins** for each valid bug
          reported!
        </Typography>
      </Box>

      {/* Feedback Form Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: "20px",
          flexGrow: 1,
          bgcolor: "#F3F7FF",
          borderRadius: "10px",
          fontFamily: "Poppins",
          border: "2px solid",
          borderColor: "#02216F",
          boxShadow: "2px 3px #02216F",
          mb: "10px",
          mr: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            boxSizing: "border-box",
            px: "10px",
            py: "5px",
            borderRadius: "5px",
            fontSize: "18px",
          }}
        >
          <img
            src={feedback}
            alt="Ai_Icon"
            style={{ width: isSm ? "10%" : "5%", height: "auto" }}
          />
          We'd love to hear from you!
        </Typography>

        {/* Feedback type (Bug Report, Suggestion) */}
        <TextField
          select
          label="Feedback Type"
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.feedbackType}
          helperText={
            errors.feedbackType ? "Please select a feedback type" : ""
          }
        >
          <MenuItem value="">
            <em>Select Feedback Type</em>
          </MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
          <MenuItem value="suggestion">General Suggestion</MenuItem>
        </TextField>

        {/* Feedback Text */}
        <TextField
          label="Your Feedback (Minimum 50 characters)"
          multiline
          sx={{
            flexGrow: 1,
          }}
          rows={6}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.feedbackText}
          helperText={
            errors.feedbackText
              ? feedbackText.length < 50
                ? "Your feedback must be at least 50 characters"
                : "Please provide your feedback"
              : ""
          }
        />

        {/* Conditionally show the Upload Screenshot for Bug Report */}
        {feedbackType === "bug" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flexGrow: 1,
            }}
          >
            <Button variant="outlined" component="label" fullWidth>
              Upload Screenshot (Max 2MB each, up to 3 screenshots)
              <input type="file" hidden multiple onChange={handleFileUpload} />
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flexGrow: 1,
              }}
            >
              {screenshots.map((screenshot, index) => (
                <Typography key={index}>{screenshot.name}</Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Submit Button with Green Success Icon and Animation */}
        <Button
          variant="contained"
          color={submissionSuccess ? "success" : "primary"}
          onClick={handleSubmit}
          disabled={isSubmitting || submissionSuccess}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "Black",
              boxShadow: "2px 3px #FFDA55",
            },
            boxShadow: "2px 3px #FFDA55",
          }}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} />
            ) : submissionSuccess ? (
              <CheckCircle sx={{ color: "green" }} />
            ) : null
          }
        >
          {isSubmitting
            ? "Submitting..."
            : submissionSuccess
            ? "Feedback Submitted!"
            : "Submit Feedback"}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedBack;
