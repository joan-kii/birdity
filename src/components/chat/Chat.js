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
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0.5),
  },
  messageUser: {
    width: theme.spacing(15),
    margin: theme.spacing(0, 0.1),
    lineHeight: theme.spacing(0.2),
    padding: theme.spacing(0.3, 0),
  },
  messageText: {
    maxWidth: theme.spacing(32),
    margin: theme.spacing(0, 0.3),
    lineHeight: theme.spacing(0.2),
    padding: theme.spacing(0.5),
    background: '#f8f5f1',
    borderRadius: theme.shape.borderRadius,
  },
  sended: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(0.5),
    '& cite': {
      background: '#8fd6e1',
      borderRadius: theme.shape.borderRadius,
    },
  },
  received: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(0.5),
    '& cite': {
      background: '#9fe6a0',
      borderRadius: theme.shape.borderRadius,
    },
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

const ChatMessage = (props) => {

  const classes = useStyles();
  const { currentUser } = useAuth();

  const {text, uid, userName } = props.message;
  const messageClass = uid === currentUser.uid ? classes.sended : classes.received;

  return (
    <div className={messageClass}>
      <cite className={classes.messageUser} >{userName} says:</cite>
      <p className={classes.messageText}>{text}</p>
    </div>
  )
};

const Chat = () => {

  const { currentUser } = useAuth();
  const classes = useStyles();

  const {openChat, setOpenChat} = useContext(Context);
  const [renderMessages, setRenderMessages] = useState();
  const [isNewMessage, setIsNewMessage] = useState(true);

  const message = useRef();
  const messages = useRef();
  const scroll = useRef();

  const handleCloseChat = () => {
    setOpenChat(false);
  };
  
  useEffect(() => {
    async function getChatMessages() {
      await db.collection('messages')
              .orderBy('createdAt')
              .limitToLast(25).get().then((querySnapshot) => {
                messages.current = querySnapshot.docs;
              })
      setRenderMessages(messages.current.map((doc, index) => {
        const message = doc.data();
        return <ChatMessage key={index} message={message} />
      }));
      setIsNewMessage(false);
    }
    if (isNewMessage) getChatMessages();
  }, [isNewMessage])
  
  useEffect(() => {
    if (openChat) scroll.current.scrollIntoView({behavior: 'smooth'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

const handleSendMessage = async () => {
    const newMessage = {
      text: message.current.value,
      uid: currentUser.uid,
      userName: currentUser.displayName,
      createdAt: firebaseTimestamp(),
    };
    await db.collection('messages')
            .add(newMessage)
            .catch((err) => {
              console.error(err);
            })
    message.current.value = '';
    message.current.focused = false;
    setIsNewMessage(true);
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
                data-testid='closeButton'
                size='small'
                className={classes.actionButton}
                onClick={handleCloseChat}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.chatField}>
            {renderMessages}
            <span ref={scroll}></span>
          </div>
          <AppBar className={classes.bottomBar}>
            <Toolbar className={classes.toolBar}>
            <div className={classes.inputField}>
              <div className={classes.inputIcon}>
                <MessageIcon />
              </div>
              <InputBase 
                data-testid='textField'
                placeholder='Enter Message...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.input
                  }}
                inputProps={{'aria-label': 'message'}} 
                inputRef={message} />
              </div>
              <IconButton 
                data-testid='sendButton'
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
