import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import firebase from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { LoginApi } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DashboardRoute, IngredientsRoute } from '../../Routes/RoutesConstants';

const useStyles = makeStyles((theme) => ({
  loginStyle: {
    width: '80%',
    backgroundColor: 'white',
    margin: 'auto',
    padding: theme.spacing(2),
    marginTop: theme.spacing(22),
    borderRadius: '10px',
    boxShadow: ' 0px 20px 40px #0000001F',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  SigninTextStyle: {
    textAlign: 'start',
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    fontWeight: 500,
    color: '#41A58D',
  },
  textboxStyle: {
    paddingTop: theme.spacing(1),
  },
  textboxStyle1: {
    paddingTop: theme.spacing(5),
  },
  textfieldStyle: {
    width: '90%',
  },
  forgotpasswordStyle: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    textAlign: 'end',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  buttonStyle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing(3.5),
  },
  signUpbutton: {
    width: '40%',
    backgroundColor: 'white',
    border: '2px solid #41A58D',
    color: '#41A58D',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#41A58D',
      color: 'white',
    },
  },
  signinButton: {
    width: '40%',
    backgroundColor: '#41A58D',
    color: 'white',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'white',
      color: '#41A58D',
      border: '2px solid #41A58D',
    },
  },
  textfields: {
    paddingLeft: theme.spacing(3),
  },
  divider: {
    width: '85%',
    marginLeft: theme.spacing(3),
  },
  errors: {
    textAlign: 'initial',
    fontWeight: 400,
    fontSize: 12,
    color: 'red',
    marginTop: theme.spacing(1),
  },
}));

const validationSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Enter the valid Email.')
    .required('Required *.'),
  userPassword: Yup.string()
    .min(8, 'Password must be atleast 8 character.')
    .required('Required *.'),
});

function SignIn(props: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginCredentials, setLoginCredentials] = React.useState<any>('');
  const [invalidUserEmail, setInvalidUserEmail] = React.useState(false);
  const [invalidUserPassword, setInvalidUserPassword] = React.useState(false);

  const loginUser = (userEmail: any, userPassword: any) => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((response: any) => {
        localStorage.setItem('uid', response.user.uid);
      })
      .then(() => {
        setIsLoading(false);
        LoginApi({}, onSuccessLogin);
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (error.code === 'auth/user-not-found') {
          setInvalidUserEmail(true);
        } else if (error.code === 'auth/wrong-password') {
          setInvalidUserEmail(false);
          setInvalidUserPassword(true);
        } else {
          setInvalidUserPassword(false);
        }
        throw error.message;
      });
  };

  const onSuccessLogin = (response: any) => {
    navigate(IngredientsRoute);
    setIsLoading(false);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      loginUser(loginCredentials.userEmail, loginCredentials.userPassword);
    }
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={12} lg={3}></Grid>
        <Grid item xs={12} md={12} lg={6}>
          <div className={classes.loginStyle}>
            <div>
              <Typography variant='h5' className={classes.SigninTextStyle}>
                SignIn
              </Typography>
              <Divider className={classes.divider} />
              <div className={classes.textfields}>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{ userEmail: '', userPassword: '' }}
                  onSubmit={(value: any) => {
                    setLoginCredentials(value);
                    loginUser(value.userEmail, value.userPassword);
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                    } = props;
                    return (
                      <form onSubmit={handleSubmit}>
                        <div className={classes.textboxStyle}>
                          <TextField
                            type='text'
                            className={classes.textfieldStyle}
                            value={values.userEmail}
                            onChange={handleChange('userEmail')}
                            label='Enter Email'
                            onKeyPress={handleKeyPress}
                          />
                          <div>
                            <Typography className={classes.errors}>
                              {invalidUserEmail
                                ? 'Invalid email, Please enter the valid email.'
                                : errors.userEmail}
                            </Typography>
                          </div>
                        </div>
                        <div className={classes.textboxStyle1}>
                          <TextField
                            type='password'
                            value={values.userPassword}
                            onChange={handleChange('userPassword')}
                            className={classes.textfieldStyle}
                            label='Enter Password'
                          />
                          <div>
                            <Typography className={classes.errors}>
                              {invalidUserPassword
                                ? 'Invalid password, Please enter the valid password.'
                                : errors.userPassword}
                            </Typography>
                          </div>
                        </div>
                        <Typography className={classes.forgotpasswordStyle}>
                          Forgot Password ?
                        </Typography>
                        <div className={classes.buttonStyle}>
                          <Button className={classes.signUpbutton}>
                            SignUp
                          </Button>
                          <Button
                            type='submit'
                            style={
                              isMobile && isLoading ? { width: '50%' } : {}
                            }
                            className={classes.signinButton}
                          >
                            {isLoading ? 'Signing In' : 'Sign In'}
                            {isLoading ? (
                              <i
                                style={{ fontSize: 15, marginLeft: 20 }}
                                className='fas fa-spinner fa-pulse'
                              ></i>
                            ) : (
                              ''
                            )}
                          </Button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={3}></Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
