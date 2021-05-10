import React from 'react';

import ContextProvider from './context/Context';
import Topbar from './components/topbar/Topbar';
import LeftMenu from './components/leftMenu/LeftMenu';
import NewPostArea from './components/newPostArea/NewPostArea';

const App = () => {
  
  return (
    <>
      <ContextProvider>               
        <Topbar />
        <LeftMenu />
        <NewPostArea />
      </ContextProvider>
    </>
  );
};

export default App;
