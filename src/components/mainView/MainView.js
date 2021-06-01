import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NewPostArea from '../newPostArea/NewPostArea';
import PostCard from '../postCard/PostCard';
import { db } from '../../firebase';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing(9),
    marginLeft: theme.spacing(40),
    padding: theme.spacing(1),
    width: theme.spacing(110),
  }, 
  progress: {
    margin: 'auto',
    marginTop: theme.spacing(10),
  },
}))


const MainView = () => {

  const classes = useStyles();

  const [arePostsLoaded, setArePostsLoaded] = useState(false);
  const posts = [];
  let userName = useRef();
  let createdAt = useRef();
  let imageUrl = useRef();
  let text = useRef();
  let likes = useRef();
  let comments = useRef();

  useEffect(() => {
    async function getPosts() {
      await db.collection('posts').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
          userName.current = posts[0].userName;
          createdAt.current = posts[0].createdAt;
          imageUrl.current = posts[0].imageUrl;
          text.current = posts[0].text;
          likes.current = posts[0].likes;
          comments.current = posts[0].comments;
          setArePostsLoaded(true);
        })
      })
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={classes.root}>
      <NewPostArea />  
      {arePostsLoaded ? 
        <PostCard 
          userName={userName.current}
          /* createdAt={createdAt.current} */
          imageUrl={imageUrl.current}
          text={text.current}
          likes={likes.current}
          comments={comments.current} /> :
        <CircularProgress 
          className={classes.progress}/>}
    </div>
  )
};

export default MainView;
