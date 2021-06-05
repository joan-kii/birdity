import React, { useState, useEffect, useRef } from 'react'
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
import { db, firestore } from '../../firebase';

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
  commentCard: {
    marginBottom: theme.spacing(2),
  }
}));

const PostCard = (docRef) => {

  const { currentUser } = useAuth();
  const classes = useStyles();
  
  const post = docRef.docRef.data();
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const userName = post.userName;
  const createdAt = post.createdAt.toDate().toLocaleDateString();
  const imageUrl = post.imageUrl;
  const text = post.text;

  const textCommentRef = useRef();
  const [textComment, setTextComment] = useState('');
  
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if (currentUser) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [currentUser])

  useEffect(() => {
    async function createComment() {
      const comment = {
        'comment': textComment, 
        'createdAt': new Date().toLocaleDateString(), 
        'userName': currentUser.displayName
      };
      await db.collection('posts')
        .doc(docRef.docRef.id)
        .update({'comments': [...comments, comment]})
        .catch((err) => {
        console.error(err);
      })
      textCommentRef.current.value = '';
      textCommentRef.current.focused = false;
      setTextComment('');
      await db.collection('posts').doc(docRef.docRef.id).get().then((doc) => {
        setComments(doc.data().comments);
      }).catch((err) => {
        console.error(err);
      });
    }
    if (textComment !== '') createComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textComment])
  
  const handleLikes = async () => {
    if (!isLiked) {
      await db.collection('posts').doc(docRef.docRef.id).update({
        likes: firestore.FieldValue.increment(1)
      }).then(() => {
        setIsLiked(!isLiked);
      }).catch((err) => {
        console.error(err);
      })
    } else {
      await db.collection('posts').doc(docRef.docRef.id).update({
        likes: firestore.FieldValue.increment(-1)
      }).then(() => {
        setIsLiked(!isLiked);
      }).catch((err) => {
        console.error(err);
      })
    }
    await db.collection('posts').doc(docRef.docRef.id).get().then((doc) => {
      setLikes(doc.data().likes);
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateComment = (event) => {
    event.preventDefault();
    setTextComment(textCommentRef.current.value);
  };

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
          disabled={isDisabled}
          onClick={handleLikes}>
          <Badge 
            badgeContent={likes}
            showZero>
            <FavoriteIcon 
              color={isLiked ? 'error' : 'disabled'} />
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
          <form onSubmit={handleCreateComment}>
            <Grid 
              container
              className={classes.commentField}>
              <Grid item>
                <TextField 
                inputRef={textCommentRef}
                label={isDisabled ? 'Please, login to comment' : 'Write a comment'} 
                placeholder='Max. 150 chars.'
                disabled={isDisabled} />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.commentButton}
                  startIcon={<ChatBubbleOutlineIcon />}
                  type='submit'
                  disabled={isDisabled}
                  >
                  Comment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Divider />
        {(comments.length !== 0) && comments.map((comment, index) => {
          return <Card 
            key={index}
            className={classes.commentCard}>
            <CardHeader 
              avatar={
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>}
              title={comment.userName}
              subheader={comment.createdAt}>
            </CardHeader>
              <CardContent>
                <Typography 
                  paragraph
                  color='textSecondary'>
                  {comment.comment}
                </Typography>
              </CardContent>
              <Divider />
          </Card>
        })}
      </Collapse>
    </Card>
  )
};

export default PostCard
