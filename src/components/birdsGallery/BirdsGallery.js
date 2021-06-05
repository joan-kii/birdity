import React, { useEffect, useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { db } from '../../firebase';
import { useAuth } from '../../context/Context';

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: 800,
    height: 800,
  },
  progress: {
    marginLeft: theme.spacing(40),
    marginTop: theme.spacing(10),
  },
}));

const BirdsGallery = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();

  const [userGallery, setUserGallery] = useState([]);
  const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);

  useEffect(() => {

    async function getUserGallery() {
      await db.collection('users').doc(currentUser.uid).get().then((doc) => {
        doc.data().posts.forEach(async (post) => {
          await db.collection('posts').doc(post.id).get().then((doc) => {
            setUserGallery(prevImage => {
              return [...prevImage, doc.data().imageUrl]
            })
          })
        })
      }).catch((err) => {
        console.error(err);
      })
      setIsGalleryLoaded(true)
    }
    getUserGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isGalleryLoaded ? 
        <GridList 
          className={classes.gridList} 
          cols={3}
          cellHeight={184}>
          {userGallery.map((imageUrl, index) => {
            return <GridListTile key={index}>
              <img 
                src={imageUrl}
                alt='Bird' />
            </GridListTile>
          })}
        </GridList> : 
        <CircularProgress className={classes.progress} />}
    </div>
  )
};

export default BirdsGallery;
