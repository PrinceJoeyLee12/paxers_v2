import React from 'react';
// material
import { Popover, PopperProps } from '@material-ui/core';
import { alpha, styled } from '@material-ui/core/styles';
import { PopoverProps } from '@material-ui/core';

const ArrowStyle = styled('span')(({ theme }: any) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette?.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette?.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette?.grey[500], 0.12)}`,
  },
}));

interface MenuPopoverProps {
  children: any;
  sx?: any;
  open: boolean;
  anchorEl: any;
  onClose: () => void;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  sx,
  open,
  ...other
}) => {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          boxShadow: (theme: any) => theme.customShadows?.z20,
          border: (theme: any) => `solid 1px ${theme.palette?.grey[500_8]}`,
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
};

export default MenuPopover;
