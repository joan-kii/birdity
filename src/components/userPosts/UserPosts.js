import React, { useEffect } from 'react';

import { db } from '../../firebase';
import { useAuth } from '../../context/Context';
import PostCard from '../postCard/PostCard';

const UserPosts = () => {

  const { currentUser } = useAuth();

  const postRefs = [];

  useEffect(() => {
    async function getUserPosts() {
      await db.collection('users').doc(currentUser.uid).get().then((doc) => {
        const posts  = doc.data().posts;
        posts.forEach((post, index) => {
          postRefs.push(
            <PostCard 
              index={index}
              docRef={post} />
          )
        });
      }).catch((err) => {
        console.error(err);
      })
    }
    getUserPosts();
  }, [postRefs])

  console.log(postRefs)
  return (
    <div>
      {postRefs}
    </div>
  )
};

export default UserPosts
