import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { LogoIcon, ProgressCard, SidebarContainer, UserCard } from "../../Common";
import { IQGemIcon } from "../../assets/Image";

const SideBar = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <SidebarContainer gap={2}>
      <ProgressCard
        icon={IQGemIcon}
        title="IQ Gems"
        Count={100}
      />
    <ProgressCard
        icon={IQGemIcon}
        title="XP+"
        Count={100}
      />
    </SidebarContainer>
  );
};

export default SideBar;
