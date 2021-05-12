import React, { useState, useEffect } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../context/Context';

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
  cameraIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    top: theme.spacing(1),
  },
  inputFile: {
    display: 'none',
  },
  checkIcon: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    top: theme.spacing(1),
  },
  logInAlert: {
    width: theme.spacing(27),
    margin: 'auto',
  }
}));

const NewPostArea = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    setIsImageLoaded(true);
    console.log(image.name)
  };

  const handleCreatePost = () => {
    setIsImageLoaded(false);
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
              className={classes.textField}
              label='Create a Post'
              placeholder='Max. 150 chars.'
              disabled={disableUpload}
              inputProps={{maxLength: 150}}
              multiline
              rowsMax={4} />
          </Grid>
          {!isImageLoaded ? 
            <Grid 
              item
              className={classes.cameraIcon}>
                <input 
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
            </ Grid>}
          <Grid item>
            <Button
              data-testid='sendPostButton'
              variant='contained'
              color='primary'
              disabled={disableUpload}
              onClick={handleCreatePost}
              endIcon={<SendIcon />
              }>
              Send
            </Button>
          </Grid>
        </Grid>
        {disableUpload && 
        <Alert 
          severity='info'
          className={classes.logInAlert}>
          Please, log in to post
        </Alert>}
      </Paper>
    </div>
  )
};

export default NewPostArea;
