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
    top: '10%',
    left: '30%',
    alignItems: 'center',
    padding: theme.spacing(2, 4, 3)
  },
  title: {
    fontSize: 24,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
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
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  }
}));

const SignUpForm = () => {

  const classes = useStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validName, setValidName] = useState(true);
  const { setOpenLogInForm, setOpenSignUpForm,
    googleSignUp, facebookSignUp, twitterSignUp,
    signUp } = useContext(Context);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userNameRef = useRef();

  const toggleModal = () => {
    setOpenLogInForm(true);
    setOpenSignUpForm(false);
  };

  const enableGoogleButton = () => {
    userNameRef.current.value.length > 2 ? 
      setValidName(false) : setValidName(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match!')
    }
    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value, userNameRef.current.value);
    } catch {
      setError('Failed to create an account')
    }
    setOpenSignUpForm(false);
    setLoading(false);
  }

  async function handleGoogleSignUp() {
    try {
      setError('');
      setLoading(true);
      await googleSignUp();
    } catch {
      console.error(error);
      setError('Unable to Sign Up with Google');
    }
    setOpenSignUpForm(false);
    setLoading(false);
  }

  async function handleFacebookSignUp() {
    try {
      setError('');
      setLoading(true);
      await facebookSignUp();
    } catch {
      console.error(error);
      setError('Unable to Sign Up with Facebook');
    }
    setOpenSignUpForm(false);
    setLoading(false);
  }

  async function handleTwitterSignUp() {
    try {
      setError('');
      setLoading(true);
      await twitterSignUp();
    } catch {
      console.error(error);
      setError('Unable to Sign Up with Twitter');
    }
    setOpenSignUpForm(false);
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
            Sign Up
        </Typography>

        {error && <Alert severity='error'>{error}</Alert>}

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid container justify='center'>
              <ButtonGroup variant='contained'
                size='large' 
                aria-label='contained button group'>
                <Button 
                  data-testid='facebookSignUpButton'
                  onClick={handleFacebookSignUp}
                  endIcon={<FacebookIcon />}>
                  Sign Up with Facebook
                </Button>
                <Button 
                  data-testid='twitterSignUpButton'
                  onClick={handleTwitterSignUp}
                  startIcon={<TwitterIcon />}>
                  Sign Up with Twitter
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField required
                id='userName'
                data-testid='userName'
                type='text'
                inputRef={userNameRef}
                fullWidth
                label='Name'
                placeholder='At least 3 characters'
                variant='outlined'
                onChange={enableGoogleButton}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField required
                id='email'
                data-testid='email'
                type='email'
                inputRef={emailRef}
                fullWidth
                label='Email'
                variant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
              <TextField required
                id='password'
                data-testid='password'
                type='password'
                inputRef={passwordRef}
                fullWidth
                label='Password'
                variant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
              <TextField required
                id='confirmPassword'
                data-testid='confirmPassword'
                type='password'
                inputRef={confirmPasswordRef}
                fullWidth
                label='Confirm Password'
                variant='outlined'
                />
            </Grid>
          </Grid>
          <Button 
            data-testid='emailSignUpButton'
            type='submit'
            className={classes.button}
            variant='contained'
            size='large'
            fullWidth
            disabled={loading}>
              Sign Up
          </Button>
          <Button
            data-testid='googleSignUpButton'
            variant='contained'
            className={classes.googleButton}
            onClick={handleGoogleSignUp}
            size='large'
            fullWidth
            disabled={validName}
            startIcon={<SvgIcon htmlColor='inherit'>
              <svg role="img" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><title>Google icon</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
            </SvgIcon>}>
            Sign Up with Google
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link 
                variant='subtitle1'
                className={classes.text}
                onClick={toggleModal}>
                  Already have an account? Log in.
                </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default SignUpForm;
