import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
  const docs = useFirestore('images');
  console.log(docs);
  
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
     <CardMedia />
    </Card>
  )
};

export default PictureSideCard
