
import React from 'react';
import { Box } from '@mui/material';
import {IQEDIcon} from '../../assets/Image'

const LogoIcon = ({widthCus}) => (
  <Box sx={{ width: widthCus || '100px', height: 'auto' }}>
    <img src={IQEDIcon} alt="IQED Logo" style={{ width: '100%', height: 'auto' }} />
  </Box>
);

export default LogoIcon;