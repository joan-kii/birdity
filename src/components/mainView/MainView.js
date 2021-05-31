import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NewPostArea from '../newPostArea/NewPostArea';
import PostCard from '../postCard/PostCard';
import { db } from '../../firebase';

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
}))


const MainView = () => {

  const classes = useStyles();

  const posts = [];

  useEffect(() => {
    db.collection('posts').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      })
    })
  })

  return (
    <div className={classes.root}>
      <NewPostArea />  
      <PostCard 
        userName='joankii'
        createdAt='today'
        imageUrl='https://firebasestorage.googleapis.com/v0/b/birdity-624f7.appspot.com/o/bird_1.jpg?alt=media&token=4297c35a-74de-43ce-8000-d390c1ad3c66'
        text='What is this beauty I saw on my bike ride today?'
        likes='10'
        comments={[]} />
    </div>
  )
};

export default MainView;
