import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ContextProvider from './context/Context';
import Topbar from './components/topbar/Topbar';
import LeftMenu from './components/leftMenu/LeftMenu';
import MainView from './components/mainView/MainView';
import PictureSideCard from './components/pictureSideCard/PictureSideCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
  }
});

const App = () => {

  const classes = useStyles();
  
  return (
    <>
      <ContextProvider>               
        <Topbar />
        <LeftMenu /> 
        <div className={classes.root}>
          <MainView />
          <PictureSideCard />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
