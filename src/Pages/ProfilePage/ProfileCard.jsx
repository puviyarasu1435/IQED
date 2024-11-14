import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  LinearProgress,
  Divider,
  IconButton,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from "react-redux";
import { IQCoinIcon,IQGemIcon,FireIconSVG,IQRankIcon} from "../../assets";
const StatBox = ({ icon, value, label }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      borderRadius: "10px",
      gap: 1,
      boxSizing: "border-box",
      p: "8px",
      bgcolor: "#fff",
      color: "#02216F",
      border: "2px solid",
      borderColor: "#FFDA55",
      boxShadow: "2px 4px #FFDA55",
      height: "100%",
    }}
  >
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
    >
      <img src={icon} alt={label} width={50} height={50} />
    </Box>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
      <Typography variant="caption">{label}</Typography>
    </Box>
  </Box>
);

const ProfileCard = ({onSettingsClick}) => {
  const UserData = useSelector((state) => state.UserState);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        flexGrow: 0,
        gap: isSm ? "10px" : "20px",
        bgcolor: "#02216F",
        color: "#fff",
        boxSizing: "border-box",
        p: "20px",
        borderRadius: "10px",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Grid sx={{ flexGrow: 0 }}>
        <Grid item sx={{ textAlign: "center", marginTop: "50px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              boxSizing: "border-box",
              px: "50px",
            
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -50,
                zIndex: 1,
              }}
            >
              <Avatar
                src="/path/to/avatar.jpg"
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px solid #ffffff",
                }}
              />
              <IconButton
              onClick={onSettingsClick}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "#fff",
                  bgcolor: "#FFDA55",
                  "&:hover": { bgcolor: "#FFC107" },
                }}
              >
                <SettingsIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: "150px", // Adjust this value based on your layout
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {UserData.Name?UserData.Name:"Puvi"}
            
              
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: "#FFDA55",
                fontWeight: 900,
                whiteSpace: "nowrap",
              }}
            >
              {UserData.XP} XP
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
           
            {/* Divider on the left side */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#FFDA55",
                width: 2,
                borderRadius: "20px",
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" fontWeight="900">
                  Level - 1
                </Typography>
                <Typography variant="body2">10000XP</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(UserData.XP/10000) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 10,
                    marginY: 1,
                    width: "100%",
                    backgroundColor: "#537EE3",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#FFDA55",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ flexGrow: 1, height: "100%" }}>
        <Grid item xs={4}>
          <StatBox icon={IQCoinIcon} value={UserData.IQGems} label="Total IQ Coins" />
        </Grid>
        <Grid item xs={4}>
          <StatBox icon={FireIconSVG} value={UserData.Streak} label="Total Strike" />
        </Grid>
        <Grid item xs={4}>
          <StatBox icon={IQRankIcon} value={UserData.Rank} label="Rank" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
