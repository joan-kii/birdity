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
    maxWidth: theme.spacing(50),
    maxHeight: theme.spacing(50),
    marginTop: theme.spacing(-21),
    marginLeft: theme.spacing(155),
  },
  text: {
    color: theme.palette.primary.light,
  }, 
  cardTitle: {
    margin: 'auto',
  }
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
  console.log(randomPic.current)
  
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
       <CircularProgress /> :
       <CardMedia image={randomPic.current}/>
     }
    </Card>
  )
};

export default PictureSideCard
