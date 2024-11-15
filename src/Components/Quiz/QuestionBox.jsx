import { Box, Typography } from "@mui/material";
import React from "react";
import { OptionButton } from "../../Common";
import { RabbitIMG } from "../../assets/Image";

const QuestionBox = ({ index, Question }) => {
  // Ensure Question and options exist before trying to render
  if (!Question || !Question.options || Question.options.length === 0) {
    return <Typography variant="h6" color="white">No options available for this question.</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A49BA",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "75%", lg: "65%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
        gap={3}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: { xs: "40vh", md: "60vh" },
            minHeight: "20vh",
          }}
          gap={2}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "600",
              fontSize: { lg: "30px", md: "25px", xs: "20px" },
              color: "white",
            }}
          >
            Q{index + 1}) {Question.question}
          </Typography>
          {Question.type === "text-image" && (
            <Box
              component="img"
              src={RabbitIMG}
              sx={{
                width:"250px",
                height: "auto",
                maxWidth: "100%",
              }}
              alt="Rabbit"
            />
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {Question.options.map((option, idx) => (
            <OptionButton
              key={idx}
              index={idx}
              quiz={Question}
              type={option.type}
              content={option.content}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionBox;
