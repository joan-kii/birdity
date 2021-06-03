import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../postCard/PostCard';
import { db } from '../../firebase';
import { useAuth } from '../../context/Context';

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

const UserPosts = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();
 
  const [arePostsLoaded, setArePostsLoaded] = useState(false);
  const [renderPosts, setRenderPosts] = useState();

  useEffect(() => {
    const posts = [];
    async function getPosts() {
      await db.collection('users').doc(currentUser.uid).get().then((doc) => {
        doc.data().posts.map((post) => {
          return db.collection('posts').doc(post.id).get().then((docRef) => {
            posts.push(docRef);
          }).catch((err) => {
            console.error(err);
          })
        })
      }).catch((err) => {
        console.error(err);
      });
      setRenderPosts(posts.map((docRef, index) => {
        return <PostCard 
          key={index}
          docRef={docRef} />}))
      setArePostsLoaded(true);
    }
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.root}>
      {arePostsLoaded ? renderPosts : 
        <CircularProgress 
           className={classes.progress} />}
    </div>
  )
};

export default UserPosts
