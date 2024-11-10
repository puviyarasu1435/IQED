import { useEffect, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DynamicBackground } from "../../Common";
import {
  WhiteBackgroundSVG,
  YellowBackgroundSVG,
  BlueBackgroundSVG,
} from "../../assets/SVG";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const location = useLocation();
  const backgroundImage = useMemo(() => {
    const backgroundMap = {
      "/": YellowBackgroundSVG,
      "/auth": BlueBackgroundSVG,
      "/signup": BlueBackgroundSVG,
      "/general-quiz-test": YellowBackgroundSVG,
      "/gq-success": YellowBackgroundSVG,
      "/gq-get-result": YellowBackgroundSVG,
      "/gq-get-result-vai-wa": YellowBackgroundSVG,
      "/commenquiztest": YellowBackgroundSVG,
      "/guestlobby": YellowBackgroundSVG,
    };
    console.log(location.pathname.toLowerCase());
    return backgroundMap[location.pathname.toLowerCase()] || WhiteBackgroundSVG;
  }, [location.pathname]);

  return (
    <DynamicBackground
      sx={{ backgroundImage: `url(${backgroundImage})` }}
      className="Root-BackGround"
    >
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </DynamicBackground>
  );
};

export default RootLayout;
