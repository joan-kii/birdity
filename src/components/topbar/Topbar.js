import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Modal from '@material-ui/core/Modal'; 

import { Context } from '../../context/Context';
import SignUpForm from '../signUpForm/SignUpForm';

const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
      display: 'flex',
    },
  appBar: {
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

const Topbar = () => {

  const classes = useStyles();
  const { openSignUpForm, setOpenSignUpForm } = useContext(Context);

  const handleSignUp = () => {
    setOpenSignUpForm(true);
  };

  const handleCloseSignUpForm = () => {
    setOpenSignUpForm(false);
  };

  const renderSignUpForm = (<div><SignUpForm /></div>);
  
  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar className={classes.topbar}>
          <div className={classes.leftSide}>
            <Typography component={Link} className={classes.logo} to={'/'}>
              Birdity
            </Typography>
            <Typography className={classes.slogan}>
              The Birdwatching Social Network
            </Typography>
          </div>
          <div className={classes.rightSide}>
            <Button
              data-testid='chatButton'
              variant='contained'
              color='primary'
              startIcon={<ChatIcon />}
              className={classes.button}>
              <Typography>
                Chat
              </Typography>
            </Button>
            <Button
              data-testid='exploreButton'
              variant='contained'
              color='primary'
              startIcon={<ExploreIcon />}
              className={classes.button}>
              <Typography>
                Explore
              </Typography>
            </Button>
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
            </Button>
          </div>
        </ Toolbar>
      </ AppBar>
      <Modal
        open={openSignUpForm}
        onClose={handleCloseSignUpForm}
        aria-labelledby='modal-title'
        aria-describedby='modal-descrition'>
        {renderSignUpForm}
      </Modal>
    </div>
  )
};

export default Topbar