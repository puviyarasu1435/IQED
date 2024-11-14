import React from "react";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Coin } from "../assets";

const RewardCard = ({ title, leftText, coinValue }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#02216F",
        borderRadius: "15px",
        padding: "10px 20px",
        width: "100%",
        maxWidth: "350px",
        boxSizing: "border-box",
        mb: 2,
      }}
    >
      {/* Title Section */}
      <Typography
        variant="body1"
        sx={{
          color: "#FFFFFF",
          fontWeight: "600",
          mb: 1,
          fontSize: isSm ? "12px" : null,
        }}
      >
        {title}
      </Typography>

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          padding: "10px",
          width: "100%",
        }}
      >
        {leftText && (
          <>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                color: "#02216F",
                textAlign: "left",
                fontSize: isSm ? "16px" : null,
              }}
            >
              {leftText}
            </Typography>
            <Divider
              orientation="vertical"
              sx={{
                borderRightWidth: 2,
                bgcolor: "black",
                borderRadius: "50px",
              }}
            />
          </>
        )}
        {/* Right Side Coin + Value */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Box
            component="img"
            src={Coin}
            alt="coin"
            sx={{
              width: isSm ? "30px" : "50px",
              height: isSm ? "30px" : "50px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#02216F",
              textAlign: "right",
              fontSize: isSm ? "16px" : null,
            }}
          >
            +{coinValue}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RewardCard;
