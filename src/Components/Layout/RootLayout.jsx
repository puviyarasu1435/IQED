import { Box } from '@mui/system';
import React, { useEffect, useState, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DynamicBackground from '../../Common/Container/DynamicBackground';
import { WhiteBackgroundSVG,YellowBackgroundSVG,BlueBackgroundSVG } from '../../assets/SVG';

const RootLayout = () => {

  const location = useLocation();
  const backgroundImage = useMemo(() => {
    const backgroundMap = {
      "/": YellowBackgroundSVG,
      "/signin": BlueBackgroundSVG,
      "/signup": BlueBackgroundSVG,
      "/general-quiz-test": YellowBackgroundSVG,
      "/gq-success": YellowBackgroundSVG,
      "/gq-get-result": YellowBackgroundSVG,
      "/gq-get-result-vai-wa": YellowBackgroundSVG,
      "/commenquiztest": YellowBackgroundSVG,
      "/guestlobby": YellowBackgroundSVG,
    };
    return backgroundMap[location.pathname.toLowerCase()] || WhiteBackgroundSVG;
  }, [location.pathname]);

  return (
      <DynamicBackground sx={{backgroundImage: `url(${backgroundImage})`}} className='Root-BackGround'>
        <Outlet />
      </DynamicBackground>
  );
};

export default RootLayout;





