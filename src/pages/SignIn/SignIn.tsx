import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import firebase from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginStyle: {
    width: '80%',
    backgroundColor: 'white',
    margin: 'auto',
    padding: theme.spacing(2),
    marginTop: theme.spacing(15),
    borderRadius: '10px',
    boxShadow: ' 0px 20px 40px #0000001F',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  SigninTextStyle: {
    textAlign: 'start',
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    fontWeight: 500,
    color: '#41A58D',
  },
  textboxStyle: {
    paddingTop: theme.spacing(1),
  },
  textboxStyle1: {
    paddingTop: theme.spacing(3),
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
}));

function SignIn() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassowrd] = React.useState('');

  const loginUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div>
      <Grid container>
        <Grid xs={12} md={12} lg={3}></Grid>
        <Grid xs={12} md={12} lg={6}>
          <div className={classes.loginStyle}>
            <div>
              <Typography variant='h5' className={classes.SigninTextStyle}>
                SignIn
              </Typography>
              <Divider style={{ width: '90%', marginLeft: '30px' }} />
              <div>
                <div className={classes.textboxStyle}>
                  <TextField
                    className={classes.textfieldStyle}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.id)}
                    label='Enter Email'
                  />
                </div>
                <div className={classes.textboxStyle1}>
                  <TextField
                    type='password'
                    value={userPassword}
                    onChange={(e) => setUserPassowrd(e.target.id)}
                    className={classes.textfieldStyle}
                    label='Enter Password'
                  />
                </div>
              </div>
              <Typography className={classes.forgotpasswordStyle}>
                Forgot Password ?
              </Typography>
              <div className={classes.buttonStyle}>
                <Button className={classes.signUpbutton}>SignUp</Button>
                <Button onClick={loginUser} className={classes.signinButton}>
                  SignIn
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={12} lg={3}></Grid>
      </Grid>
    </div>
  );
}

export default SignIn;
