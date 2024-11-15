import React from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const LevelCard = ({ level, progress, total, image, onSelect,active }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        // height:'150px',
        // flexDirection:isSm?'column-reverse':null,
        flexDirection:'column-reverse',
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "3px 5px #02216F",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        mb: "16px",
        mr: isSm ? null : "30px",
        border: "2px solid",
        borderColor: "#02216F",
        gap:'20px'
      }}
    >
      {/* Left side: Level information */}
      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" , width:'100%'}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography
            variant= {isMd?"h6":"h5"}
            sx={{
              fontWeight: "bold",
              color: "#02216F",
            }}
          >{`Level ${level}`}</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#02216F",
              px: "10%",
              bgcolor: "rgba(241, 154, 255, 0.4)",
              borderRadius: "50px",
            }}
          >{`${progress}/${total}`}</Typography>
        </Box>
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={(progress / total) * 100}
          sx={{
            height: "20px",
            borderRadius: "50px",
            margin: "8px 0",
            border: "2px solid",
            borderColor: "#02216F",
            bgcolor: "#1A49BA",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#FFDA55",
              borderRadius: "20px",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={onSelect}
          disabled={!active}
          sx={{
            
            height: { xs: "40px", sm: "40px", md: "50px", lg: "50px" },
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            color: "#fff",
            boxShadow: "2px 3px #FFDA55",
            borderRadius: '50px',
            textTransform: "none",
            border: "1px solid",
            borderColor: "#FFDA55",
            "&:hover": {
              color: "#1A49BA",
              backgroundColor: "#FFDA55",
              transition: "transform 0.3s ease-in-out",
              transform: "translateY(-5px)",
              boxShadow: "2px 3px #1A49BA",
              border: "1px solid",
              borderColor: "#1A49BA",
            },
          }}
        >
          Continue
        </Button>
      </Box>

      {/* Right side: Image */}
      <Box sx={{ marginLeft: "16px",width:'20%',display:'flex', justifyContent:'center', alignItems:'center' }}>
        <img
          src={image}
          alt={`Level ${level}`}
          style={{ width: '150px', height: "150px" }}
        />
      </Box>
    </Box>
  );
};

export default LevelCard;
