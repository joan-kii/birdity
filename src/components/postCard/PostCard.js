import React from 'react'
import Card from '@material-ui/core/Card'; 
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';  

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  }
});

const PostCard = (props) => {
  console.log(props)

  const classes = useStyles();

  const userName = props.userName;
  const createdAt = props.createdAt;
  const imageUrl = props.imageUrl;
  const text = props.text;
  const likes = props.likes;

  return (
    <Card className={classes.root}>
      <CardHeader 
        avatar= {
          <Avatar>
            <AccountCircleIcon />
          </Avatar>}
        title={userName}
        subheader={createdAt}>
      </CardHeader>
      <CardMedia
        image={imageUrl} />
      <CardContent>
        <Typography 
          variant='body'
          color='textSecondary'
          component='p'>
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton 
          aria-label='likes'>
          <Badge badgeContent={likes}>
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label='comments'>
          <Typography
            variant='body'
            color='textSecondary'
            component='p'>
            Comments
          </Typography>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
};

export default PostCard
