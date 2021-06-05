import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
 
import { useAuth } from '../../context/Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  data: {
    display: 'flex',
  },
  field: {
    fontSize: theme.spacing(2.5),
    marginLeft: theme.spacing(30),
  },
  text: {
    fontSize: theme.spacing(2.5),
    marginLeft: 'auto',
    marginRight: theme.spacing(30),
  }
}));

const UserProfile = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();
  const signupDate = new Date(
      currentUser.metadata.creationTime).toLocaleDateString();

  return (
    <Card className={classes.root}>
      <Typography 
        className={classes.title}
        component='h2' 
        variant='h5' 
        color='textSecondary'
        gutterBottom>
        User Profile
      </Typography>
      <CardContent 
        className={classes.data}>
        <Typography 
          className={classes.field}
          color='textSecondary'
          component='p'>
          Name: 
        </Typography>
        <Typography 
          className={classes.text}
          component='p'>
          {currentUser.displayName}
        </Typography>
      </CardContent>
      <Divider variant='middle' />
      <CardContent 
        className={classes.data}>
        <Typography 
          className={classes.field}
          color='textSecondary'
          component='p'>
          Email: 
        </Typography>
        <Typography 
          className={classes.text}
          component='p'>
          {currentUser.email}
        </Typography>
      </CardContent>
      <Divider variant='middle' />
      <CardContent 
        className={classes.data}>
        <Typography 
          className={classes.field}
          color='textSecondary'
          component='p'>
          Birdity User since: 
        </Typography>
        <Typography 
          className={classes.text}
          component='p'>
          {signupDate}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default UserProfile;
