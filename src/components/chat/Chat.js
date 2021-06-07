import React, { useContext, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import { fade, makeStyles } from '@material-ui/core/styles';

import { Context } from '../../context/Context';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: theme.spacing(55),
    height: theme.spacing(40),
    zIndex: 1,
    borderRadius: theme.spacing(1),
  }, 
  topBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 'auto',
    top: 0,
    height: '15%',
    borderTopRightRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
    background: theme.palette.primary.dark,
  }, 
  inputField: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputIcon: {
    paddingTop: theme.spacing(0, 2),
    marginLeft: theme.spacing(1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  actionButton: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    background: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.white,
    },
  },
  chatField: {
    height: '70%',
  },
  bottomBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 'auto',
    bottom: 0,
    height: '15%',
    borderBottomRightRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    background: theme.palette.primary.dark,
  }
}));

const Chat = () => {

  const classes = useStyles();

  const {openChat, setOpenChat} = useContext(Context);

  const user = useRef();
  const message = useRef();

  const handleCloseChat = () => {
    setOpenChat(false);
};

const handleSendMessage = () => {
    if (user) console.log(user.current.value);
    if (message) console.log(message.current.value);
  };

  return (
    <>
      {openChat && 
        <Paper className={classes.root}>
          <AppBar className={classes.topBar}>
            <Toolbar className={classes.toolBar}>
              <div className={classes.inputField}>
                <div className={classes.inputIcon}>
                  <SearchIcon />
                </div>
                <InputBase 
                  placeholder='Search User...'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input
                    }}
                  inputProps={{'aria-label': 'search'}} 
                  inputRef={user} />
              </div>
              <IconButton 
                size='small'
                className={classes.actionButton}
                onClick={handleCloseChat}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.chatField}>
            LOL!!!
          </div>
          <AppBar className={classes.bottomBar}>
            <Toolbar className={classes.toolBar}>
            <div className={classes.inputField}>
              <div className={classes.inputIcon}>
                <MessageIcon />
              </div>
              <InputBase 
                placeholder='Enter Message...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.input
                  }}
                inputProps={{'aria-label': 'message'}} 
                inputRef={message} />
              </div>
              <IconButton 
                size='small'
                className={classes.actionButton}
                onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
      </Paper>}
    </>
  )
}

export default Chat;
