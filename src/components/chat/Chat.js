import React, { useContext, useRef, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import { fade, makeStyles } from '@material-ui/core/styles';

import { Context, useAuth } from '../../context/Context';
import { db, firebaseTimestamp } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    width: theme.spacing(37),
    height: theme.spacing(60),
    zIndex: theme.zIndex.drawer + 1,
    borderRadius: theme.spacing(1),
  }, 
  topBar: {
    position: 'relative',
    height: '10%',
    borderTopRightRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
    background: theme.palette.primary.dark,
  }, 
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  chatField: {
    height: '80%',
  },
  sended: {},
  received: {},
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
      width: '14ch',
      '&:focus': {
        width: '18ch',
      },
    },
  },
  actionButton: {
    position: 'relative',
    marginRight: theme.spacing(-2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    background: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.common.white,
    },
  },
  bottomBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 'auto',
    bottom: 0,
    height: '10%',
    borderBottomRightRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    background: theme.palette.primary.dark,
  }
}));

const Chat = () => {

  const classes = useStyles();

  const { currentUser } = useAuth();
  const {openChat, setOpenChat} = useContext(Context);
  const [renderMessages, setRenderMessages] = useState();

  const user = useRef();
  const message = useRef();

  const handleCloseChat = () => {
    setOpenChat(false);
  };
  
  useEffect(() => {
    let messages;
    function getChatMessages() {
      messages = db.collection('messages')
              .orderBy('createdAt')
              .limitToLast(25).get().then((dataSnapshot) => {
                console.log(dataSnapshot.docChanges())
              })
      /* setRenderMessages(messages.map((message, index) => {
        const messageClass = message.userName === currentUser.displayName ? classes.sended : classes.received;
        return (
          <div 
            key={index}
            className={messageClass}>
            <Snackbar
              message={message.text} />
            <Avatar>
              {message.userName}
            </Avatar>
          </div>
          )
      })) */
    }
    getChatMessages();
  }, [])

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
              <Typography 
                className={classes.title}
                variant='h6'
                component='h3'>
                Birdity SuperChat
              </Typography>
              <IconButton 
                size='small'
                className={classes.actionButton}
                onClick={handleCloseChat}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.chatField}>
            {renderMessages}
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
