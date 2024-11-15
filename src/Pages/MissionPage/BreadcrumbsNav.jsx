import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const BreadcrumbNav = ({ paths }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      {paths.map((crumb, index) => {
        if (crumb.onClick) {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              onClick={crumb.onClick}
              style={{ cursor: 'pointer' }}
              sx={{ typography: 'body1' , fontWeight:'bold'}}
            >
              {crumb.label}
            </Link>
          );
        } else {
          return (
            <Typography  key={index} >
              {crumb.label}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
