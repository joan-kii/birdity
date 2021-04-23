import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link as RouterLink, BrowserRouter as Router } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  grow: {
      flexGrow: 1,
  },
  topbar: {
    backgroundColor: theme.palette.white,
  },
  logo: {
    fontSize: 30,
    color: theme.palette.secondary.dark,
    underline: 'none',
  }, 
}));

const Topbar = () => {

  const classes = useStyles();
  
  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar className={classes.topbar}>
          <Router>
            <Link component={RouterLink} className={classes.logo} to="/">
              <Typography>
                Birdity
              </Typography>
            </Link>
          </Router>
        </ Toolbar>
      </ AppBar>
    </div>
  )
};

export default Topbar