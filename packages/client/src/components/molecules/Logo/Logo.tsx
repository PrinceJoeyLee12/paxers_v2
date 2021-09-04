import React from 'react';
import { Box } from '@material-ui/core';

interface Props {
  sx?: any;
}

const Logo: React.FC<Props> = ({ sx }) => {
  return (
    <Box
      component="img"
      src="/static/logo.svg"
      sx={{ width: 120, height: 100, ...sx }}
    />
  );
};

export default Logo;
