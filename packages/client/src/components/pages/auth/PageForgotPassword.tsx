import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Form, TextField } from '../../utils/FormElements';
import { forgotPassword } from '../../../actions/auth';
import {
  Grid,
  Avatar,
  Button,
  CssBaseline,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { green } from '@material-ui/core/colors';

//Custom Styling

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Typography: {
    marginBottom: theme.spacing(2),
    color: 'red',
  },

  Links: {
    padding: '10px',
  },
  end: {
    textAlign: 'end',
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

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
});

interface Props extends RouteComponentProps {
  forgotPassword: (formData: { email: string }, setResponse: any) => any;
}

const PageForgetPassword: React.FC<Props> = ({ forgotPassword }) => {
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleResponse = (msg: string, status: number, errors: any) => {
    Object.keys(errors).length > 0 ? setApiErrors(errors) : setApiErrors({});
    if (status !== 200) {
      if (!errors || Object.keys(errors).length === 0)
        //toast.error(msg);
        setSuccess(false);
    } else setSuccess(true);
    setSubmitted(true);
  };

  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography
            component='h6'
            variant='h6'
            className={classes.Typography}
          >
            Forgot Password
          </Typography>
          <Typography component='p' variant='h6'>
            Change your password in three easy steps. This will help you to
            secure your password!
          </Typography>
          <List>
            <ListItem>
              <Typography component='p'>1. Email address below.</Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                2. Will send you a temporary link.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component='p'>
                3. Use the link to reset your password
              </Typography>
            </ListItem>
          </List>
          <Divider />
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
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordValidationSchema}
                onSubmit={(values, { setErrors }) => {
                  if (!success) {
                    setApiErrors({});
                    setErrors({});
                    setSubmitted(false);
                    forgotPassword(values, handleResponse);
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
                          fullWidth
                          autoFocus
                          value={values.email}
                          error={errors.email || apiErrors.email ? true : false}
                          helperText={errors.email || apiErrors.email}
                          name='email'
                          label='Email'
                          type='email'
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
                            ? 'Link Sent! Please Check'
                            : isSubmitting && !submitted
                            ? 'Please wait...'
                            : 'Send Me A Link'}
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
        -
      </Container>
    </Fragment>
  );
};

export default connect(null, { forgotPassword })(PageForgetPassword);
