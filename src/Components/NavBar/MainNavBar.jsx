import React, { useMemo } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import ExtensionIcon from "@mui/icons-material/Extension";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import PersonIcon from "@mui/icons-material/Person";
import {useLocation, useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import {Logo,LogoIcon} from "../../Common";


const MainNavBar = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const currentOutlet = location.pathname;

  const navItems = useMemo(
    () => [
      { label: "Explore", icon: <ExtensionIcon />, path: "/explore" },
      { label: "Missions", icon: <FlagCircleIcon />, path: "/missions" },
      { label: "Multiplayer", icon: <SportsMmaIcon />, path: "/game" },
      { label: "Leaderboard", icon: <LeaderboardIcon />, path: "/leaderboard" },
      { label: "Profile", icon: <PersonIcon />, path: "/profile" },
      ...(isSm
        ? [{ label: "FeedBack", icon: <ErrorIcon />, path: "/feedBack" }]
        : []),
    ],
    [isSm]
  );

  const bottomItems = useMemo(
    () => [{ label: "FeedBack", icon: <ErrorIcon />, path: "/feedBack" }],
    []
  );

  const renderButton = ({ label, icon, path, key }) => {
    const isSelected = currentOutlet.toLowerCase() === path.toLowerCase();

    return (
      <Button
        key={key}
        fullWidth={!isSm}
        startIcon={React.cloneElement(icon, {
          sx: {
            color: isSelected ? "white" : "#02216F",
            fontSize: "24px",
          },
        })}
        onClick={() => navigate(path)}
        sx={{
          justifyContent: isMd ? "center" : "flex-start",
          color: isSelected ? "white" : "#02216F",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "16px",
          boxSizing: "border-box",
          minWidth: "0",
          whiteSpace: "nowrap",
          alignItems: "center",
          boxShadow: isSelected ? "2px 3px #fff" : "",
          bgcolor: isSelected ? "#02216F" : "transparent",
          "& .MuiButton-icon": {
            m: isMd ? "0" : null,
          },
          "&:hover": {
            bgcolor: "#02216F",
            boxShadow: "2px 3px #fff",
            color: "white",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
        }}
      >
        {!isMd && label}
      </Button>
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#FFDA55",
        width: isSm ? "100%" : isMd ? "80px" : "200px",
        height: isSm ? "50px" : "100%",
        boxSizing: "border-box",
        borderRadius: isSm ? "0" : isMd ? "10px" : "20px",
        boxShadow: isSm ? "null" : "5px 6px #02216F",
        p: isSm ? "10px" : isMd ? "10px" : "20px 10px 20px 20px",
        display: "flex",
        flexDirection: isSm ? "row" : "column",
        gap: isSm ? "null" : "20px",
        alignItems: isMd ? "center" : null,
        position: isSm ? "fixed" : null,
        bottom: isSm ? 0 : null,
        zIndex: isSm ? 999 : null,
      }}
    >
      {isSm ? null : isMd ? (
        <LogoIcon widthCus="50px" />
      ) : (
        <Logo widthCus="120px" />
      )}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: isSm ? "row" : "column",
          gap: "5px",
          justifyContent: isSm ? "space-between" : null,
        }}
      >
        {navItems.map((item) => renderButton({ ...item, key: item.label }))}
      </Box>
      {isSm ? null : (
        <Box
          sx={{
            display: "flex",
            flexDirection: isSm ? "row" : "column",
            gap: "5px",
            flexGrow: 0,
          }}
        >
          {bottomItems.map((item) =>
            renderButton({ ...item, key: item.label })
          )}
        </Box>
      )}
    </Box>
  );
};

export default MainNavBar;
