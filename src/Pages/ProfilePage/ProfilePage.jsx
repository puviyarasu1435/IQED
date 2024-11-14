import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import ProfileCard from "./ProfileCard";
import TotalQuests from "./TotalQuests";
const ProfilePage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowAccountSettings(true);
  };

  const handleCloseAccountSettings = () => {
    setShowAccountSettings(false);
  };

  return (
    <Box sx={{
      width:'100%',
    }}>
      {showAccountSettings ? (
        <AccountSettings onClose={handleCloseAccountSettings} />
      ) : (
        
          <Box
            sx={{
              pt: "70px",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: "20px",
              
            }}
          >
            <ProfileCard onSettingsClick={handleSettingsClick} />
            <TotalQuests />
          </Box>
       
      )}
    </Box>
  );
};

export default ProfilePage;
