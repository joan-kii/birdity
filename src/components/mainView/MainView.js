import React, { useEffect } from 'react';

import NewPostArea from '../newPostArea/NewPostArea';
import PostCard from '../postCard/PostCard';
import { db } from '../../firebase';


const MainView = () => {

  const posts = [];

  useEffect(() => {
    db.collection('posts').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
        console.log(posts[0].userName)
      })
    })
  })

  return (
    <>
      <NewPostArea />  
      {posts.length !== 0 && 
        <PostCard 
          userName={posts[0].userName}
          createdAt={posts[0].createdAt}
          imageUrl={posts[0].imageUrl}
          likes={posts[0].likes}
          comments={posts[0].comments} />}
    </>
  )
};

export default MainView;
