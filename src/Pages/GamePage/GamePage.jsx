// ExplorePage.js
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import {GameTopicArea} from "../../Components";
import PeopleIcon from "@mui/icons-material/People";
import { VSIcon } from "../../assets";
const Contest = [
  {
    Title: "Mixed Questions",
    listItems: [
      "There are 30 multiple choice questions.",
      "Approximate test time: Fifteen minutes.",
      "The questions are of varying difficulty.",
      "All questions are worth the same points.",
    ],
    image: VSIcon,
  },
  {
    Title: "Mixed Questions",
    listItems: [
      "There are 30 multiple choice questions.",
      "Approximate test time: Fifteen minutes.",
      "The questions are of varying difficulty.",
      "All questions are worth the same points.",
    ],
    image: VSIcon,
  },
];

const GamePage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
 
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            gap: "20px",
            overflow: "hidden",
            marginTop:'10px',
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              flexDirection: isSm ? "column" : "row",
              flexGrow: 0,
              gap: isSm ? "10px" : "20px",
              bgcolor: "#1A49BA",
              boxSizing: "border-box",
              p: "20px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 0,
                gap: isSm ? "10px" : "20px",
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
                Welcome to the 1 vs 1 Duel Arena!
              </Typography>
              <Typography
                sx={{
                  fontSize: isSm?"10px":"12px",
                  color: "White",
                  fontWeight: 400,
                }}
              >
                Step into the arena and challenge your friends in a thrilling
                one-on-one quiz battle! {isSm ? null : <br />}
                Test your knowledge with AI-crafted questions, outsmart your
                opponent, and claim the crown as the ultimate quiz champion.
                It's time to see who really has what it takes!
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent:'center',
                flexGrow: 1,
               
                bgcolor: "white",
                p: "10px",
                borderRadius: "10px",
                gap:'10px',
                boxSizing:'border-box',
                m:'10px'
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  border: "2px solid",
                  borderColor: "#02216F",
                }}
              >
                <input
                  placeholder="Enter a join code"
                  value={''}
                  onChange={""}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    color: "black",
                  }}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                // startIcon={<PeopleIcon />}
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#1A49BA",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "Black",
                  },
                  boxShadow: "2px 3px #FFDA55",
                }}
              >
                Join
              </Button>
            </Box>
          </Box>

          <GameTopicArea contestData={Contest} />
        </Box>
     
  );
};

export default GamePage;
