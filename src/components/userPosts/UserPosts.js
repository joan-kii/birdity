import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { db } from '../../firebase';
import { useAuth } from '../../context/Context';
import PostCard from '../postCard/PostCard';

const UserPosts = () => {

  const { currentUser } = useAuth();

  const [userPostRefs, setUserPostsRefs] = useState([]);
  const [arePostsLoaded, setArePostsLoaded] = useState(false);

  useEffect(() => {

    async function getUserPosts() {
      await db.collection('users').doc(currentUser.uid).get().then((doc) => {
        doc.data().posts.forEach(async (post) => {
          await db.collection('posts').doc(post.id).get().then((docRef) => {
            setUserPostsRefs(prevDocRef => {
              return [...prevDocRef, docRef]
            })
          })
        })
      }).catch((err) => {
        console.error(err);
      })
      setArePostsLoaded(true)
    }
    getUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {arePostsLoaded ? userPostRefs.map((docRef, index) => {
        return <PostCard key={index} docRef={docRef} />}) :
        <CircularProgress 
          style={{margin: '35%',
                  marginTop: '25%',}} />
      }
    </div>
  )
};

export default UserPosts
