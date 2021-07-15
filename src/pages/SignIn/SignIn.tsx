import { Button, Card, CardContent, CircularProgress, Divider, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Images/logo.png';
import Page from '../../components/Page/Page';
import useSnackbar from '../../hook/useSnackbar';
import { useStore } from '../../Mobx/Helpers/UseStore';
import { AuthStateChange, signInWithCredenrials } from '../../utils/FirebaseUtils';
import Loader from '../../components/Loader/Loader';
import { DashboardRoute, ForgotPasswordRoute } from '../../Routes/RoutesConstants';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MobxObserver from '../../Mobx/Helpers/MobxObserver';

// const useStyles1 = makeStyles((theme: any) =>{console.log(theme)})
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

const Signin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const Snackbar = useSnackbar();
  const { UserStore } = useStore();
  const [authLoading, setAuthLoading] = useState(true);

  const loginUser = (value: any, { setSubmitting }: any) => {
    setSubmitting(true);
    signInWithCredenrials(value.email, value.password)
      .then((response: any) => {
        setSubmitting(false);
        UserStore.setIdToken(response.user.uid);
      })
      .catch((error: any) => {
        console.log('Firebase Login Error', error);
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
        <Page title='Login' />
        <div className={classes.logoImgDiv} ><img className={classes.logoImg} src={Logo} /></div>
        <div className={classes.rootMain}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="h3"
              >
                Login
              </Typography>
              <Formik
                enableReinitialize
                initialValues={{ email: '', password: '' }}
                onSubmit={loginUser}
                validationSchema={Yup.object().shape({
                  email: Yup.string().trim().required('Email is required'),
                  password: Yup.string().trim().required('Password is required'),
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
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        value={values.password}
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
                      {isSubmitting ? <CircularProgress className={classes.btnLoading} size={25} /> : 'Login'}
                    </Button>
                  </form>
                )}
              </Formik>

              <Divider className={classes.divider} />
              <Link
                align="center"
                color="textPrimary"
                component={RouterLink}
                to={ForgotPasswordRoute}
                underline="always"
                variant="subtitle2"
              >
                Forgot Password?
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

export default MobxObserver(Signin);


