import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import NewPostArea from '../newPostArea/NewPostArea';
import PostCard from '../postCard/PostCard';
import { db } from '../../firebase';
import { Context } from '../../context/Context';

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
  const [renderPosts, setRenderPosts] = useState();
  const { reRenderPosts, setReRenderPosts } = useContext(Context);
  
  useEffect(() => {
    const posts = [];
    async function getPosts() {
      await db.collection('posts').get().then((querySnapshot) => {
        querySnapshot.forEach((documentReference) => {
          posts.push(documentReference);
        })
      }).catch((err) => {
        console.error(err);
      });
      setRenderPosts(posts.map((docRef, index) => {
        return <PostCard 
          key={index}
          docRef={docRef} />}))
      setReRenderPosts(false);
      setArePostsLoaded(true);
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderPosts])
  
  return (
    <div className={classes.root}>
      <NewPostArea />  
      {arePostsLoaded ? renderPosts : 
        <CircularProgress 
           className={classes.progress} />}
    </div>
  )
};

export default MainView;
