import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TextsmsIcon from '@material-ui/icons/Textsms';
import BookIcon from '@material-ui/icons/Book';

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
})); 

const LeftMenu = () => {

  const classes = useStyles();

  return (
    <Drawer variant='permanent'className={classes.drawer}>
      <Toolbar />
      <List>
        <ListItem button key='My Birds'>
          <ListItemIcon>
            <PhotoLibraryIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary='My Birds' className={classes.text} />
        </ListItem> 

        <ListItem button key='My Blog'>
          <ListItemIcon>
            <TextsmsIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary='My Blog' className={classes.text} />
        </ListItem>  

        <ListItem button key='My Comments'>
          <ListItemIcon>
            <BookIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary='My Comments' className={classes.text} />
        </ListItem> 
      </List>
      <Divider />
      <ListItem button key='AboutUs'>
        <ListItemText primary='About Us' className={classes.text} />
      </ListItem>
    </Drawer>
  )
};

export default LeftMenu;
