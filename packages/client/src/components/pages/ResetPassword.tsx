import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../molecules/PageHelmet/Page';
import { MHidden } from '../atoms/@material-extend';
import ResetPasswordForm from '../organisms/Authentication/ResetPasswordForm';
import AuthSocial from '../organisms/Authentication/AuthSocial';
import { getPageTitle, getPath } from '../../utils/routes';
import { Routes } from '../../constants';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const StyledTopography = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const StyledList = styled('ol')(({ theme }) => ({
  marginLeft: theme.spacing(0, 0, 0, 4),
}));

// ----------------------------------------------------------------------

const ResetPassword: React.FC = () => {
  return (
    <RootStyle title={getPageTitle(getPath(Routes.RESET_PASSWORD))}>
      <AuthLayout>
        Back to &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/login"
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Congrats !!! You can now change your password
          </Typography>
          <img
            alt="register"
            src="/static/illustrations/illustration_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Reset your password
            </Typography>
            <Box ml={3}>
              <Typography sx={{ color: 'text.secondary' }}>
                <ol>
                  <li>
                    Password should be at least{' '}
                    <strong>
                      1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character
                    </strong>
                  </li>
                  <li>
                    Password should be at least <strong>8 characters</strong>
                  </li>
                </ol>
              </Typography>
            </Box>
          </Box>
          <ResetPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ResetPassword;
