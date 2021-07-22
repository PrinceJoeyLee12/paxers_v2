import React, { Fragment, useState, useRef, useEffect } from 'react';
// import { withRouter } from 'react-router';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import { resetPassword } from '../../../actions/auth';
import { UserResetPassword } from '../../../interfaces/user';
import {
  Grid,
  Button,
  Typography,
  CssBaseline,
  Container,
  Avatar,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from '../../utils/FormElements';
import { green } from '@material-ui/core/colors';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

//Page Styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  Links: {
    padding: '10px',
  },
  end: {
    textAlign: 'end',
  },
  form: {
    marginTop: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const RegisterValidationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must Contain 8 At Least Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required('Password field is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password field is required'),
});

interface Props extends RouteComponentProps {
  resetPassword: (formData: UserResetPassword, setResponse: any) => any;
}

const PageResetPassword: React.FC<Props> = (
  props,
  { match, history }: RouteComponentProps<{ token: string }>
) => {
  const classes = useStyles();
  const timer: React.MutableRefObject<number | undefined> = useRef();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleResponse = (msg: string, status: number, errors: any) => {
    // Object.keys(errors).length > 0 ? setApiErrors(errors) : setApiErrors({});
    if (status !== 200) setSuccess(false);
    else {
      setSuccess(true);
      // toast("You'll be redirected to Login Page");
      timer.current = window.setTimeout(() => {
        history.push('/login');
      }, 5000);
    }
    setSubmitted(true);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <Grid
            container
            spacing={2}
            direction='row'
            justify='center'
            alignItems='center'
            className={classes.form}
          >
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  password: '',
                  passwordConfirm: '',
                  token: '',
                }}
                validationSchema={RegisterValidationSchema}
                onSubmit={(values, { setErrors }) => {
                  if (!success) {
                    setErrors({});
                    setSubmitted(false);
                    //add token to the values object

                    values.token = match.params.token;
                    props.resetPassword(values, handleResponse);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  isValid,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form>
                    <Grid
                      container
                      spacing={2}
                      direction='row'
                      justify='center'
                      alignItems='center'
                    >
                      <Grid item xs={12}>
                        <TextField
                          value={values.password}
                          error={errors.password ? true : false}
                          name='password'
                          helperText='Must Contain At Least 8 Characters Must Have At Least One Uppercase, One Lowercase And One Number'
                          label='New Password'
                          type='password'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.passwordConfirm}
                          error={errors.passwordConfirm ? true : false}
                          name='passwordConfirm'
                          helperText={errors.passwordConfirm}
                          label='Confirm New Password'
                          type='password'
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          color='primary'
                          fullWidth
                          variant='contained'
                          disabled={(isSubmitting || !isValid) && !submitted}
                        >
                          {submitted && success
                            ? 'Successfully Changed'
                            : isSubmitting && !submitted
                            ? 'Please wait...'
                            : 'Submit'}
                          {isSubmitting && !submitted && (
                            <CircularProgress
                              size={24}
                              className={classes.buttonProgress}
                            />
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
              <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
              >
                <Grid item xs={6} className={classes.Links}></Grid>
                <Grid
                  item
                  xs={6}
                  className={classnames(classes.Links, classes.end)}
                >
                  <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Typography color='primary' variant='body1'>
                      Login Here
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Fragment>
  );
};

export default connect(null, { resetPassword })(PageResetPassword);
