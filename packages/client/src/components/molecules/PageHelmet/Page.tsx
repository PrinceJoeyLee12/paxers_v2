import React from 'react';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@material-ui/core';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

type RefType = number;
const PageHelmet = forwardRef<RefType, Props>(
  ({ children, title = '', ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
);

export default PageHelmet;
