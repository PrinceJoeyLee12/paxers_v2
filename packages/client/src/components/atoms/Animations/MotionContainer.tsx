import React from 'react';
import { motion } from 'framer-motion';
// material
import { Box } from '@material-ui/core';
//
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

interface Props {
  open: boolean;
  children: React.ReactNode;
  initial: boolean;
}

const MotionContainer: React.FC<Props> = ({
  open,
  children,
  initial,
  ...other
}) => {
  return (
    <Box
      component={motion.div}
      initial={initial}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      {...other}
    >
      {children}
    </Box>
  );
};

export default MotionContainer;
