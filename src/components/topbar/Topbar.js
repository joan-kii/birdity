import React, { useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Modal from '@material-ui/core/Modal'; 
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Context, useAuth } from '../../context/Context';
import SignUpForm from '../signUpForm/SignUpForm';
import LogInForm from '../logInForm/LogInForm';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: 'solid 1px #e0e0e0',
  },
  topbar: {
    justifyContent: 'space-between',
    background: theme.palette.common.white,
  },
  leftSide: {
    display: 'flex',
  },
  rightSide: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginRight: '0.5em',
  },
  logo: {
    fontFamily: 'Satisfy',
    fontSize: 40,
    cursor: 'pointer',
    color: theme.palette.primary.dark,
    textShadow: '5px 5px 10px #999',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.light,
      textShadow: '3px 3px 7px #999'
    }
  }, 
  slogan: {
    color: theme.palette.primary.light,
    cursor: 'default',
    marginLeft: '0.6em',
    marginBottom: '0.7em',
    alignSelf: 'end',
  }
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
};

const Topbar = () => {

  const classes = useStyles();

  const { openSignUpForm, setOpenSignUpForm, 
    openLogInForm, setOpenLogInForm,
    signInError, setSignInError, openChat, 
    setOpenChat } = useContext(Context);

  const { currentUser, logout } = useAuth();

  const [showLogInAlert, setShowLogInAlert] = useState(false);
  const [showLogOutAlert, setShowLogOutAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSignUp = () => {
    setOpenLogInForm(true);
  };

  const handleCloseSignUpForm = () => {
    setOpenSignUpForm(false);
  };

  const handleCloseLogInForm = () => {
    setOpenLogInForm(false);
  };

  async function handleLogOut() {
    await logout();
    setShowLogOutAlert(true);
  }

  const handleCloseAlert = () => {
    setShowLogInAlert(false);
    setShowLogOutAlert(false);
  };

  const handleOpenChat = () => {
    setOpenChat(!openChat);
  }

  useEffect(() => {
    if(currentUser) {
      setIsDisabled(false);
      setShowLogInAlert(true);
    }
  }, [currentUser])

  const renderSignUpForm = (<div><SignUpForm /></div>);
  const renderLogInForm = (<div><LogInForm /></div>);
  
  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.topbar}>
          <Router>
            <div className={classes.leftSide}>
              <Link to={'/'} style={{textDecoration: 'none'}}>
                <Typography className={classes.logo} >
                  Birdity
                </Typography>
              </Link>
              <Typography 
                variant='body2' 
                component='h1' 
                className={classes.slogan}>
                The Birdwatching Social Network
              </Typography>
            </div>
            <div className={classes.rightSide}>
              <Button
                data-testid='chatButton'
                variant='contained'
                color='primary'
                startIcon={<ChatIcon />}
                className={classes.button}
                disabled={isDisabled}
                onClick={handleOpenChat}>
                <Typography>
                  Chat
                </Typography>
              </Button>
              {currentUser ? 
              <Button
                data-testid='logoutButton'
                variant='contained'
                color='primary'
                startIcon={<ExitToAppIcon />}
                onClick={handleLogOut}
                >
                Log Out
              </Button> : 
              <Button
                data-testid='loginButton'
                variant='contained'
                color='primary'
                startIcon={<AccountBoxIcon />}
                className={classes.button}
                onClick={handleSignUp}>
                <Typography>
                  Sign Up / Log In
                </Typography>
              </Button>}
            </div>
          </Router>
        </ Toolbar>
      </ AppBar>
      <Modal
        open={openSignUpForm}
        onClose={handleCloseSignUpForm}
        aria-labelledby='modal-title'
        aria-describedby='modal-descrition'>
        {renderSignUpForm}
      </Modal>
      <Modal
        open={openLogInForm}
        onClose={handleCloseLogInForm}
        aria-labelledby='modal-title'
        aria-describedby='modal-descrition'>
        {renderLogInForm}
      </Modal>
      <Snackbar 
        open={showLogInAlert} 
        autoHideDuration={4000}
        onClose={handleCloseAlert}>
        <Alert severity='success'>
          You are logged in!
        </Alert>
      </Snackbar>
      <Snackbar 
        open={showLogOutAlert} 
        autoHideDuration={4000}
        onClose={handleCloseAlert}>
        <Alert severity='success'>
          You are logged out!
        </Alert>
      </Snackbar>
      <Snackbar 
        open={signInError} 
        autoHideDuration={4000}
        onClose={() => setSignInError(false)}>
        <Alert severity='error'>
          Unable to Sign In!
        </Alert>
      </Snackbar>
    </div>
  )
};

export default Topbar