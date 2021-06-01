import React, { useState, useEffect } from 'react'
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
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';  

import { useAuth } from '../../context/Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),

  },
  picture: {
    maxWidth: theme.spacing(80),
    margin: 'auto',
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  text: {
    marginLeft: theme.spacing(6),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentField: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  commentButton: {
    marginTop: theme.spacing(1),
  },
}));

const PostCard = (props) => {

  const { currentUser } = useAuth();
  const classes = useStyles();
  
  const userName = props.userName;
  const createdAt = props.createdAt;
  const imageUrl = props.imageUrl;
  const text = props.text;
  const likes = props.likes;
  /* const comments = props.comments; */
  
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleLikes = () => {
    setIsLiked(!isLiked);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (currentUser) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [currentUser])

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
      <CardContent>
        <Typography 
          variant='body1'
          color='textPrimary'
          component='p'
          className={classes.text}>
          {text}
        </Typography>
      </CardContent>
      <CardMedia
        image={imageUrl}
        className={classes.picture}
        component='img' />
      <CardActions 
        disableSpacing
        className={classes.actions}>
        <IconButton 
          aria-label='likes'
          onClick={handleLikes}>
          <Badge badgeContent={likes}>
            <FavoriteIcon 
              color={isLiked ? 'error' : 'default'} />
          </Badge>
        </IconButton>
        <IconButton
          aria-label='comments'
          onClick={handleExpand}>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'>
            Comments
          </Typography>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse 
        in={isExpanded}
        timeout='auto'
        unmountOnExit>
        <Paper
          elevation={3}>
          <Grid 
            container
            className={classes.commentField}>
            <Grid item>
              <TextField 
              label={isDisabled ? 'Please, login to comment' : 'Write a comment'} 
              placeholder='Max. 150 chars.'
              disabled={isDisabled} />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                className={classes.commentButton}
                startIcon={<ChatBubbleOutlineIcon />}>
                Comment
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Divider />
        <CardHeader 
          avatar= {
            <Avatar>
              <AccountCircleIcon />
            </Avatar>}
          title='joankuu'
          subheader='One day ago'>
        </CardHeader>
        <CardContent>
          <Typography 
            paragraph
            color='textSecondary'>
            That's an amazing photo!!!
          </Typography>
        </CardContent>
        <Divider />
      </Collapse>
    </Card>
  )
};

export default PostCard
