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
import useStorage from '../../hooks/useStorage';
import { db, firestore } from '../../firebase';


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
    marginRight: theme.spacing(2.7),
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
  const [disableUpload, setDisableUpload] = useState(true);
  const [image, setImage] = useState(null);
  const { uploadProgress, imageUrl, setFile } = useStorage(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (uploadProgress === 100) {
      setLoadingImage(false);
    }
    if (uploadProgress > 0 && uploadProgress < 100) setLoadingImage(true);
  }, [uploadProgress])

  useEffect(() => {
    async function createPost() {
      const post = {text: textPostRef.current.value, 
        imageUrl, createdAt: firestore.FieldValue.serverTimestamp()};
      await db.collection('users')
        .doc(currentUser.uid)
        .collection('posts')
        .add({
            posts: post
          })
      textPostRef.current.value = '';
      textPostRef.current.focused = false;
    }
    if (imageUrl) createPost();
  }, [imageUrl])

  useEffect(() => {
    if (currentUser) {
      setDisableUpload(false);
    } else {
    setIsImageLoaded(false);
    setDisableUpload(true);
    }
  }, [currentUser])
  
  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    
    if (image && allowedFileTypes.includes(image.type)) {
      setImageUploadError(false);
      setIsImageLoaded(true);
      setImage(image);
    } else {
      setImageUploadError(true);
      setIsImageLoaded(false);
    }
  };

  const handleCreatePost = async function(event) {
    event.preventDefault();
    setIsImageLoaded(false);
    setFile(image);
  };

  const handleCloseFileErrorMessage = () => {
    setImageUploadError(false);
  };

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
