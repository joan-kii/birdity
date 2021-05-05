import React, { useContext, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SvgIcon from '@material-ui/core/SvgIcon';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'; 

import { Context } from '../../context/Context';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40%',
    top: '15%',
    left: '30%',
    alignItems: 'center',
    padding: theme.spacing(2, 4, 3)
  },
  title: {
    fontSize: 24,
    marginTop: theme.spacing(2),
    cursor: 'default',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  text: {
    fontSize: 18,
    cursor: 'pointer',
  },
  googleButton: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  }
}));

const LogInForm = () => {

  const classes = useStyles();
  const { setOpenLogInForm, setOpenSignUpForm,
    login, googleSignUp, facebookSignUp, 
    twitterSignUp } = useContext(Context);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setOpenSignUpForm(true);
    setOpenLogInForm(false);
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to Log In')
    }
    setOpenLogInForm(false);
    setLoading(false);
  }

  async function handleGoogleLogIn() {
    try {
      setError('');
      setLoading(true);
      await googleSignUp();
    } catch {
      console.error(error);
      setError('Unable to Login with Google');
    }
    setOpenLogInForm(false);
    setLoading(false);
  }

  async function handleFacebookLogIn() {
    try {
      setError('');
      setLoading(true);
      await facebookSignUp();
    } catch {
      console.error(error);
      setError('Unable to Login with Facebook');
    }
    setOpenLogInForm(false);
    setLoading(false);
  }

  async function handleTwitterLogIn() {
    try {
      setError('');
      setLoading(true);
      await twitterSignUp();
    } catch {
      console.error(error);
      setError('Unable to Login with Twitter');
    }
    setOpenLogInForm(false);
    setLoading(false);
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
        variant='h2'
        component='h4'
        className={classes.title}
        color='primary'>
          Log in
        </Typography>

        { error && <Alert severity='error'>{error}</Alert> }

        <form className={classes.form} onSubmit={handleLogin}>
          <Grid container spacing={4}>
            <Grid container justify='center'>
              <ButtonGroup variant='contained'
                size='large' 
                aria-label='contained button group'>
                <Button 
                  data-testid='facebookLogInButton'
                  onClick={handleFacebookLogIn}
                  endIcon={<FacebookIcon />}>
                  Log in with Facebook
                </Button>
                <Button 
                  data-testid='twitterLogInButton'
                  onClick={handleTwitterLogIn}
                  startIcon={<TwitterIcon />}>
                  Log in with Twitter
                </Button>
              </ButtonGroup>
              <Button
                data-testid='googleLogInButton'
                onClick={handleGoogleLogIn}
                variant='contained'
                className={classes.googleButton}
                size='large'
                startIcon={<SvgIcon htmlColor='inherit'>
                  <svg role="img" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><title>Google icon</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                </SvgIcon>}>
                Log in with Google
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField required
                data-testid='email'
                id='email'
                type='email'
                inputRef={emailRef}
                fullWidth
                label='Email'
                variant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
              <TextField required
                data-testid='password'
                id='password'
                type='password'
                inputRef={passwordRef}
                fullWidth
                label='Password'
                variant='outlined'
                />
            </Grid>
          </Grid>
          <Button 
            data-testid='emailLogInButton'
            type='submit'
            className={classes.button}
            variant='contained'
            size='large'
            fullWidth>
              Log in
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link 
                variant='subtitle1'
                className={classes.text}
                onClick={toggleModal}>
                  Need an account? Sign up.
                </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default LogInForm;