import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import useFirestore from '../../hooks/useFirestore';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: theme.spacing(70),
    maxHeight: theme.spacing(50),
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(7),
    padding: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.light,
  }, 
  cardTitle: {
    margin: 'auto',
  },
  loadingCircle: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.light,
  },
  picture: {
    maxWidth: theme.spacing(45),
    margin: 'auto',
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
}));

const PictureSideCard = () => {

  const classes = useStyles();
  const docs = useFirestore('images').docs;
  const [loadingImage, setLoadingImage] = useState(true);
  let randomPic = useRef();

  useEffect(() => {
    if (docs.length !== 0) {
      randomPic.current = docs[Math.floor(Math.random() * docs.length)].url;
      setLoadingImage(false);
    }
  }, [docs])
  
  return (
    <Card className={classes.card}>
     <CardContent 
       className={classes.cardTitle}>
       <Typography 
         variant='h6' 
         component='h3'
         className={classes.text}>
         Picture Of The Day
       </Typography>
     </CardContent>
     {loadingImage ?
       <CircularProgress 
         className={classes.loadingCircle}
         size='3rem'
         thickness={4} /> :
       <CardMedia 
         className={classes.picture}
         image={randomPic.current} 
         component='img' /> }
    </Card>
  )
};

export default PictureSideCard
