import { Button, Card, CardContent, CircularProgress, Divider, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Images/logo.png';
import Page from '../../components/Page/Page';
import useSnackbar from '../../hook/useSnackbar';
import { useStore } from '../../Mobx/Helpers/UseStore';
import { AuthStateChange, sendPasswordResetEmail, signInWithCredenrials } from '../../utils/FirebaseUtils';
import Loader from '../../components/Loader/Loader';
import { DashboardRoute, SigninRoute } from '../../Routes/RoutesConstants';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
    padding: theme.spacing(6, 2)
  },
  rootMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: theme.breakpoints.values.sm,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(3, 4, 3, 4)
  },
  logoImgDiv: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
  logoImg: {
    width: theme.spacing(20),
    height: theme.spacing(10),
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  btnLoading: {
    color: 'white'
  },
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  themeButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: theme.palette.green.main,
    '&:hover': {
      backgroundColor: theme.palette.green.dark,
    },
    '&:disabled': {
      backgroundColor: theme.palette.green.main,
    },
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const Snackbar = useSnackbar();
  const [authLoading, setAuthLoading] = useState(true);

  const submitForgotPass = (value: any, { setSubmitting }: any) => {
    setSubmitting(true);
    sendPasswordResetEmail(value.email)
      .then((response: any) => {
        setSubmitting(false);
        Snackbar.show('Reset Password link is send to your given email', 'success');
        navigate(SigninRoute)
      })
      .catch((error: any) => {
        Snackbar.show(error.message, 'error');
        setSubmitting(false);
      });
  };

  const authStateChanged = (user: any) => {
    if (user) {
      navigate(DashboardRoute);
      setAuthLoading(true);
    } else {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = AuthStateChange(authStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <AuthLoader loading={authLoading}>
      <div className={classes.root}>
        <Page title='Forgot Password' />
        <div className={classes.logoImgDiv} ><img className={classes.logoImg} src={Logo} /></div>
        <div className={classes.rootMain}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="h3"
              >
                Forgot Password
              </Typography>
              <Formik
                enableReinitialize
                initialValues={{ email: '' }}
                onSubmit={submitForgotPass}
                validationSchema={Yup.object().shape({
                  email: Yup.string().trim().required('Email is required'),
                })}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  handleSubmit,
                  isSubmitting,
                }) => (

                  <form className={classes.loginForm} onSubmit={handleSubmit}>
                    <div className={classes.fields}>
                      <TextField
                        fullWidth
                        label="Email address"
                        name="email"
                        variant="outlined"
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <Button
                      fullWidth
                      className={classes.themeButton}
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {isSubmitting ? <CircularProgress className={classes.btnLoading} size={25} /> : 'Submit'}
                    </Button>
                  </form>
                )}
              </Formik>

              <Divider className={classes.divider} />
              <Link
                align="center"
                color="textPrimary"
                component={RouterLink}
                to={SigninRoute}
                underline="always"
                variant="subtitle2"
              >
                Back to Login
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthLoader>
  );
};

const AuthLoader = ({ loading, children }: any) => {
  const [aLoading, setALoading] = useState(loading);

  useEffect(() => {
    setALoading(loading);
  }, [loading]);

  return <>{aLoading ? <Loader /> : children}</>;
};

export default ForgotPassword;


