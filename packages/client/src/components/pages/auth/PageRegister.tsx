import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../../modules/actions/auth';
import { User } from '../../../types/user';
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
import { UserPlus as UserPlusIcon } from 'react-feather';
import { green } from '@material-ui/core/colors';

const useStyles: any = makeStyles((theme: any) => ({
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
    backgroundColor: theme.palette?.secondary.main,
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
  email: Yup.string()
    .email('Invalid email')
    .required('Email field is required'),
  lastName: Yup.string().required('Your Last Name Is Required'),
  firstName: Yup.string().required('Your First Name Is Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required('Password field is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password Is Required'),
});

interface Props {
  register: (formData: User, setResponse: any) => any;
}

const PageRegister: React.FC<Props> = ({ register }) => {
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
    <>
      {/* <ToastContainer /> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <UserPlusIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            className={classes.form}
          >
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  passwordConfirm: '',
                  firstName: '',
                  lastName: '',
                }}
                validationSchema={RegisterValidationSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                  setApiErrors({});
                  setErrors({});
                  setSubmitted(false);
                  register(values, handleResponse);
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
                      direction="row"
                      alignItems="center"
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoFocus
                          value={values.firstName}
                          error={errors.firstName ? true : false}
                          helperText={errors.firstName}
                          name="firstName"
                          label="First Name"
                          type="text"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          value={values.lastName}
                          error={errors.lastName ? true : false}
                          helperText={errors.lastName}
                          name="lastName"
                          label="Last Name"
                          type="text"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.email}
                          error={errors.email || apiErrors.email ? true : false}
                          helperText={errors.email || apiErrors.email}
                          name="email"
                          label="Email"
                          type="email"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.password}
                          error={errors.password ? true : false}
                          name="password"
                          helperText="Must Be At Least 8 Characters Must Have At Least One Uppercase, One Lowercase And One Number"
                          label="Password"
                          type="password"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          value={values.passwordConfirm}
                          error={errors.passwordConfirm ? true : false}
                          name="passwordConfirm"
                          helperText={errors.passwordConfirm}
                          label="Confirm Password"
                          type="password"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          color="primary"
                          fullWidth
                          variant="contained"
                          disabled={(isSubmitting || !isValid) && !submitted}
                        >
                          {submitted && success
                            ? 'Redirecting...'
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
              <Grid container direction="row" alignItems="center">
                <Grid item xs={6} className={classes.Links}></Grid>
                <Grid
                  item
                  xs={6}
                  className={classnames(classes.Links, classes.end)}
                >
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography color="primary" variant="body1">
                      Login Here
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default connect(null, { register })(PageRegister);
