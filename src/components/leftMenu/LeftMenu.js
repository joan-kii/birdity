import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import BookIcon from '@material-ui/icons/Book';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import { useAuth } from '../../context/Context';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  text: {
    color: theme.palette.primary.dark,
  },
  icon: {
    color: theme.palette.primary.dark,
  },
  userName: {
    color: theme.palette.primary.dark,
    fontSize: theme.spacing(2.5),
    cursor: 'default',
  },
  userIcon: {
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
  },
})); 

const LeftMenu = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();

  return (
    <Drawer variant='permanent'className={classes.drawer}>
      <Toolbar />
      <List>
      {currentUser &&
        <ListItem divider>
          <PersonIcon 
          fontSize='large'
          className={classes.userIcon} />
          <Typography 
            variant='h4' 
            className={classes.userName}>
            {currentUser.displayName}
          </Typography>
        </ListItem>}
        <Router>
          <ListItem button key='My Birds'>
            <ListItemIcon>
              <PhotoLibraryIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='My Birds' className={classes.text} />
          </ListItem> 

          <Link to='/posts' style={{ textDecoration: 'none' }}>
            <ListItem button key='My Posts'>
              <ListItemIcon>
                <BookIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary='My Posts' className={classes.text} />
            </ListItem> 
          </Link>
        </Router>
      </List>
      <Divider />
      <ListItem button key='AboutUs'>
        <ListItemText primary='About Us' className={classes.text} />
      </ListItem>
    </Drawer>
  )
};

export default LeftMenu;
