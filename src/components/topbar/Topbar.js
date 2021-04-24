import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import ExploreIcon from '@material-ui/icons/Explore';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
      display: 'flex',
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
      color: theme.palette.secondary.light,
      textShadow: '3px 3px 7px #999'
    }
  }, 
  slogan: {
    color: theme.palette.primary.light,
    cursor: 'default',
    marginLeft: '0.5em',
    marginBottom: '0.9em',
    alignSelf: 'end',
  }
}));

const Topbar = () => {

  const classes = useStyles();
  
  return (
    <div className={classes.grow}>
      <AppBar position='static'>
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
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>
        </ Toolbar>
      </ AppBar>
    </div>
  )
};

export default Topbar