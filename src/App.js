import React from 'react';

import ContextProvider from './context/Context';
import Topbar from './components/topbar/Topbar';
import LeftMenu from './components/leftMenu/LeftMenu';
import MainView from './components/mainView/MainView';
import PictureSideCard from './components/pictureSideCard/PictureSideCard';

const App = () => {
  
  return (
    <>
      <ContextProvider>               
        <Topbar />
        <LeftMenu />
        <MainView />
        <PictureSideCard />
      </ContextProvider>
    </>
  );
};

export default App;
