import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../context/Context';
import { db, firebase, firebaseTimestamp } from '../firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(50),
    padding: theme.spacing(1),
    '& > *': {
      width: theme.spacing(100),
      height: theme.spacing(20),
    },
  },
  textFieldGrid: {
    alignItems: 'center',
    marginTop: theme.spacing(5)
  },
  accountIcon: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(2),
    width: '60ch',
  }, 
  uploadButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    top: theme.spacing(1),
  },
  checkIcon: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    top: theme.spacing(1),
  },
  inputFile: {
    display: 'none',
  },
  linearProgress: {
    width: theme.spacing(30),
    margin: 'auto',
  },
  logInAlert: {
    width: theme.spacing(27),
    margin: 'auto',
  }
}));

const NewPostArea = () => {

  const classes = useStyles();
  const allowedFileTypes = ['image/jpeg', 'image/png'];

  const { currentUser } = useAuth();
  const textPostRef = useRef();
  const [loadingImage, setLoadingImage] = useState(false);
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  useEffect(() => {
    if (uploadProgress === 100) {
      setIsImageLoaded(true);
      setLoadingImage(false);
    }
    if (uploadProgress > 0 && uploadProgress < 100) setLoadingImage(true);
  }, [uploadProgress]) 
  
  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    
    if (image && allowedFileTypes.includes(image.type)) {
      setImageUploadError(false);
      setImage(image);
    } else {
      setImageUploadError(true);
    }
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    setIsImageLoaded(false);
    setFile(image);
    createPost(textPostRef.current.value, imageUrl, createdAt);
    textPostRef.current.value = '';
    textPostRef.current.focused = false;
    setTimeout(() => setIsImageLoaded(false), 3000)
  };


  const useStorage = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
   
    useEffect(() => {
      if (file) {
        const storageRef = storage.ref(file.name);
        const collectionRef = db.collection('images');
        storageRef.put(file).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setUploadProgress(percentage);
        }, (err) => {
          console.error(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = firebaseTimestamp();
          await collectionRef.add({url, createdAt});
          setImageUrl(url);
          setCreatedAt(createdAt);
        });
      }
    }, [file]);
    console.log(imageUrl, createdAt)
    return {uploadProgress, imageUrl, setFile, createdAt};
  };


  // Create Post

  const createPost = (text, imageUrl, createdAt) => {
    const post = {text, imageUrl, createdAt};
    console.log(post)
    return db.collection('users')
            .doc(currentUser.uid)
            .update({
              posts: firebase.firestore.FieldValue.arrayUnion({
                post
              })
            })
  };

  const handleCloseFileErrorMessage = () => {
    setImageUploadError(false);
  };

  useEffect(() => {
    if (currentUser) {
      setDisableUpload(false);
    } else {
    setIsImageLoaded(false);
    setDisableUpload(true);
    }
  }, [currentUser])

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <form onSubmit={handleCreatePost}>
          <Grid 
            container 
            className={classes.textFieldGrid}>
            <Grid 
              item
              className={classes.accountIcon}>
              <FaceIcon 
                color='primary'
                fontSize='large' />
            </Grid>
            <Grid item>
              <TextField 
                data-testid='postTextField'
                inputRef={textPostRef}
                className={classes.textField}
                label='Create a Post'
                placeholder='Max. 150 chars.'
                disabled={disableUpload}
                InputLabelProps={{shrink: true}}
                inputProps={{maxLength: 150}}
                multiline
                rowsMax={4} />
            </Grid>
            {!isImageLoaded ? 
            <Grid 
              item
              className={classes.uploadButton}>
                <input 
                  disabled={disableUpload}
                  id='inputFile'
                  accept='image/*'
                  className={classes.inputFile}
                  type='file'
                  onChange={handleUploadImage} />
                <label htmlFor='inputFile'>
                  <IconButton 
                    data-testid='addFileButton'
                    color='primary'
                    disabled={disableUpload}
                    component='span'>
                    <PhotoCamera fontSize='large' />
                  </IconButton>
                </label>
            </Grid> :
            <Grid 
              item
              className={classes.checkIcon}>
              <DoneAllIcon color='secondary' />
            </Grid>}
            <Grid item>
              <Button
                data-testid='sendPostButton'
                variant='contained'
                color='primary'
                disabled={disableUpload}
                type='submit'
                endIcon={<SendIcon />}>
                Post
              </Button>
            </Grid>
          </Grid>
          {loadingImage &&
          <LinearProgress
          className={classes.linearProgress}
            value={uploadProgress} />}
          {disableUpload && 
          <Alert 
            severity='info'
            className={classes.logInAlert}>
            Please, log in to post
          </Alert>}
        </form>
      </Paper>
      <SnackBar 
        open={imageUploadError}
        autoHideDuration={5000}
        onClose={handleCloseFileErrorMessage}>
          <MuiAlert
            elevation={4}
            variant='filled'
            severity='error'
            onClose={handleCloseFileErrorMessage}>
            Please, select a .jpg or .png file
          </MuiAlert>
      </SnackBar>
    </div>
  )
};

export default NewPostArea;
