import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Buton from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SvgIcon from '@material-ui/core/SvgIcon';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'; 

const SignUpForm = () => {
  return (
    <Container>
      <Paper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </Paper>
    </Container>
  )
};

export default SignUpForm;
