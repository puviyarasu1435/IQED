import React from "react";
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Grid,
  Avatar,
} from "@mui/material";
import { Group, PersonAdd } from "@mui/icons-material/";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import  QuestCard  from "./QuestCard";
const DandFQuests = () => {
  return (
    <Box width={'100%'}>
      {/* Daily Quests */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Daily Quests
      </Typography>
      <Grid container spacing={2} padding={'20px'}>
        <Grid item xs={12} sm={6}>
          <QuestCard 
            icon={<LocalFireDepartmentIcon />}
            title="Start a Streak"
            progress={2}
            goal={7}
            reward={100}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QuestCard
            icon={<AdsClickIcon />}
            title="Score 90% in 2 topics"
            progress={1}
            goal={2}
            reward={100}
          />
        </Grid>
      </Grid>

      {/* Friends Quests */}
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        
      >
        Friends Quests
      </Typography>
      <Grid container spacing={2} padding={'20px'}>
        <Grid item xs={12} sm={6}>
          <QuestCard
            icon={<Group />}
            title="Challenge Your Friends"
            progress={2}
            goal={10}
            reward={100}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QuestCard
            icon={<PersonAdd />}
            title="Invite 3 Friends"
            progress={0}
            goal={3}
            reward={300}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DandFQuests;
