import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
    },
  topbar: {
    background: theme.palette.common.white,
  },
  logo: {
    fontFamily: 'Satisfy',
    fontSize: 40,
    cursor: 'pointer',
    color: theme.palette.primary.dark,
    '&:hover': {
      textDecoration: 'none',
    }
  }, 
}));

const Topbar = () => {

  const classes = useStyles();
  
  return (
    <div className={classes.grow}>
      <AppBar className={classes.topbar} position='static'>
        <Toolbar>
          <Typography component={Link} className={classes.logo} to={'/'}>
            Birdity
          </Typography>
        </ Toolbar>
      </ AppBar>
    </div>
  )
};

export default Topbar