import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    text: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  }));

const AboutUs = () => {

  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <Typography 
        className={classes.title}
        component='h2' 
        variant='h5' 
        color='textSecondary'
        gutterBottom>
        About Us
      </Typography>
      <Typography 
        className={classes.text}
        variant='body1'
        align='justify'
        paragraph>
        This is just a fake social network for bird lovers like a web app exercise at The Odin Project. It is made using React, React Router, Material-UI, and Firebase. It also has a simple chat implemented and makes use of a bird tracking API.
      </Typography>
      <Typography 
        className={classes.text}
        variant='body1'
        align='justify'
        paragraph>
        If you are interested in learning web development, I highly recommend <a href='https://theodinproject.com' target='_blank' rel='noreferrer'>The Odin Project</a>. You can see my slow but steady progress in the web development journey on my <a href='https://github.com/joan-kii?tab=repositories' target='_blank' rel='noreferrer'>Github</a>.
      </Typography>
    </Card>
  )
};

export default AboutUs;
