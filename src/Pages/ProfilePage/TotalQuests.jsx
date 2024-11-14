import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Group, PersonAdd } from "@mui/icons-material/";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import QuestCard from "../../Components/Quest/QuestCard";


const TotalQuests = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box width={"100%"}>
      {/* Button-like Tabs Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            bgcolor: "#3f51b5",
            mx: 1,
            my: 1,
            fontWeight: "bold",
            color: "#fff !important",
          },
          "& .Mui-selected": {
            border: "2px solid",
            borderColor: "#FFDA55",
            boxShadow: "2px 3px #FFDA55",
            bgcolor: "#1A237E",
            color: "#fff !important",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab label="Daily Quests" />
        <Tab label="Friends Quests" />
        <Tab label="Achievement" />
      </Tabs>

      {/* Content for Daily Quests */}
      {selectedTab === 0 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Daily Quests
          </Typography>
          <Grid container spacing={2} padding={"20px"}>
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
        </Box>
      )}

      {/* Content for Friends Quests */}
      {selectedTab === 1 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Friends Quests
          </Typography>
          <Grid container spacing={2} padding={"20px"}>
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
      )}

      {/* Content for Achievement */}
      {selectedTab === 2 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Achievement
          </Typography>
          <Grid container spacing={2} padding={"20px"}>
            <Grid item xs={12} sm={6}>
              <QuestCard
                icon={<Group />}
                title="Sage"
                progress={2}
                goal={10}
                reward={100}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuestCard
                icon={<PersonAdd />}
                title="Complete in time"
                progress={0}
                goal={3}
                reward={300}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TotalQuests;
