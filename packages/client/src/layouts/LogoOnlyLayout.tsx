import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
// components
import Logo from '../components/molecules/Logo/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

const LogoOnlyLayout: React.FC = () => {
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>
      <Outlet />
    </>
  );
};

export default LogoOnlyLayout;
