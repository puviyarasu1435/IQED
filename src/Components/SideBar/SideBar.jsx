import { Box, colors, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {
  CarouselCard,
  LogoIcon,
  ProgressCard,
  SidebarContainer,
  UserCard,
} from "../../Common";
import { IQCoinIcon, IQGemIcon, IQRankIcon } from "../../assets/Image";
;

const SideBar = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <SidebarContainer gap={2}>
      <ProgressCard icon={IQGemIcon} title="IQ Gems" Count={100} />
      <ProgressCard icon={IQCoinIcon} title="XP+ Coin" Count={100} />
      <ProgressCard icon={IQRankIcon} title="Rank" Count={100} />
    </SidebarContainer>
  );
};

export default SideBar;
