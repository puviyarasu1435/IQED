import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Levelcard from "./Levelcard";
import LevelDetails from "./LevelDetails";
import BreadcrumbsNav  from "./BreadcrumbsNav";
import  trophy from "./trophy.png";
import {useLocation, useNavigate }from "react-router-dom";
import { useCreateQuizSessionMutation } from "../../Redux/RTK/QuizAPI/QuizAPI";
import { DaTa } from "./LevelDatas";
import { useGetUserByIdQuery } from "../../Redux/RTK/AuthAPI/AuthAPI";
// Mock data for levels
const levels = [
  { level: 1, total: DaTa[0].categories.length, progress: 1, image: trophy,active:true },
  { level: 2, total: DaTa[1].categories.length, progress: 0, image: trophy,active:false },
  { level: 3, total: DaTa[2].categories.length, progress: 0, image: trophy,active:false },
  { level: 4, total: DaTa[3].categories.length, progress: 0, image: trophy,active:false },
  { level: 5, total: DaTa[4].categories.length, progress: 0, image: trophy,active:false },
];

const MissionPage = () => {

  
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { state } = location;
  const inLevel = state ? state.inLevel : undefined;
  const currentLevel = inLevel ? inLevel.level : undefined;
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  
  // Update selected level based on URL parameter
  useEffect(() => {
    
    const levelFromUrl = new URLSearchParams(location.search).get("level");

    if (levelFromUrl) {
      const level = levels.find((l) => l.level === parseInt(levelFromUrl, 10));
      if (level) {
        setSelectedLevel(level);
      } else {
        setSelectedLevel(null); // Reset if level not found
      }
    } else {
      setSelectedLevel(null); // Reset to null if no level in URL
    }
  }, [location]); // Now listening to the entire location object

  // Breadcrumb paths
  const breadcrumbPath = selectedLevel
    ? [
        { label: "Levels", to: null, onClick: () => handleReturnToLevels() }, // Clickable to return to level cards
        { label: `Level - ${selectedLevel.level}`, to: null },
      ]
    : [{ label: "Levels", to: null }];

  // Handler to select a level
  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    navigate(`/missions?level=${level.level}`); // Update URL with selected level
  };

  // Handler to return to levels
  const handleReturnToLevels = () => {
    setSelectedLevel(null);
    navigate("/missions"); // Navigate back to levels
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          ml: isSm ? "10px" : "20px",
          mr: isSm ? null : "20px",
          mt: isSm ? "10px" : "20px",
          mb: isSm ? "50px" : "20px",
          pr: isSm ? "10px" : null,
          gap: "20px",
          overflow: "hidden",
        }}
      >
        {/* Breadcrumb */}
        <BreadcrumbsNav paths={breadcrumbPath} />
        <Box
          sx={{
            p: isSm ? "10px" : null,
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "20px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Grid container spacing={2}>
            {!selectedLevel ? (
              levels.map((levelData, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <Levelcard
                    level={levelData.level}
                    progress={levelData.progress}
                    total={levelData.total}
                    image={levelData.image}
                    onSelect={() => handleSelectLevel(levelData)}
                    active={levelData.active}
                  />
                </Grid>
              ))
            ) : (
              <LevelDetails LevelData={selectedLevel.level} />
            )}
          </Grid>
        </Box>
      </Box>
      
    </>
  );
};

export default MissionPage;
