import React, { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    async function getPosts() {
      await db.collection('posts').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        })
      })
      setArePostsLoaded(true);
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className={classes.root}>
      <NewPostArea />  
      {arePostsLoaded ?
        posts.map((post) => {
          console.log(post)
          return <PostCard 
            userName={post.userName}
            createdAt={post.createdAt.toDate().toLocaleDateString()}
            imageUrl={post.imageUrl}
            text={post.text}
            likes={post.likes}
            comments={post.comments} /> 
        }) : 
        <CircularProgress 
          className={classes.progress} />}
    </div>
  )
};

export default MainView;
