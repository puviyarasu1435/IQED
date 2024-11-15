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
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../Redux/RTK/AuthAPI/AuthAPI";

const SideBar = () => {
  const UserData = useSelector((state) => state.UserState);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserId = sessionStorage.getItem("UserId");
  const { data, error, isLoading } = useGetUserByIdQuery(UserId);
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
      <ProgressCard icon={IQGemIcon} title="IQ Gems" Count={UserData.IQGems} />
      <ProgressCard icon={IQCoinIcon} title="XP+ Coin" Count={UserData.XP} />
      <ProgressCard icon={IQRankIcon} title="Rank" Count={UserData.Rank} />
    </SidebarContainer>
  );
};

export default SideBar;
