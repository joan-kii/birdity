import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(50),
    padding: theme.spacing(1),
    '& > *': {
      width: theme.spacing(100),
      height: theme.spacing(10),
    },
  },
  textField: {
    marginLeft: theme.spacing(2),
  }
}));

const NewPostArea = () => {

  const classes = useStyles();
    return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <TextField 
        className={classes.textField}
          label='Create A Post'
          placeholder='Max. 256 chars.'/>
      </Paper>
    </div>
  )
};

export default NewPostArea;
