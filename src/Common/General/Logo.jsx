
import React from 'react';
import { Box } from '@mui/material';
import { IQEDLogo } from '../../assets/Image';

const Logo = ({widthCus="100px"}) => (
  <Box sx={{width: widthCus , height: 'auto' }}>
    <img src={IQEDLogo}  alt="IQED Logo" style={{ width: '100%', height: 'auto' }} />
  </Box>
);

export default Logo;