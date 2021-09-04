import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../molecules/PageHelmet/Page';
import { MHidden } from '../atoms/@material-extend';
import ForgotPasswordForm from '../organisms/Authentication/ForgotPasswordForm';
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

interface Props {
  firstName: string;
}

const ForgotPassword: React.FC<Props> = ({ firstName }) => {
  return (
    <RootStyle title={getPageTitle(getPath(Routes.FORGOT_PASSWORD))}>
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to={getPath(Routes.LOGIN)}
        >
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
            Forgot your password ? No worries we can help you
          </Typography>
          <img
            alt="forgot-password"
            src="/static/illustrations/illustration_register.png"
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Well send you a link
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your email below and if it matches one in our database we'll
              send you a link.
            </Typography>
          </Stack>

          <ForgotPasswordForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Back to &nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={getPath(Routes.LOGIN)}
              >
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
