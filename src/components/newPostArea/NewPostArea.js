import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FaceIcon from '@material-ui/icons/Face';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const NewPostArea = () => {

  const classes = useStyles();
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
              inputProps={{maxLength: 150}}
              multiline
              rowsMax={4}/>
          </Grid>
          <Grid 
            item
            className={classes.cameraIcon}>
            <IconButton 
              data-testid='addFileButton'
              color='primary'>
              <PhotoCamera fontSize='large' />
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              data-testid='sendPostButton'
              variant='contained'
              color='primary'
              endIcon={<SendIcon />}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
};

export default NewPostArea;
