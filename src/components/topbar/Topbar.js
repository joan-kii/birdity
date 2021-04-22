import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
  },
  logo: {
    fontSize: 30,
  }
}));

const Topbar = () => {

  const classes = useStyles();
  
  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.logo}>
            Bird<span color='secondary'>ity</span>
          </Typography>
        </ Toolbar>
      </ AppBar>
    </div>
  )
};

export default Topbar