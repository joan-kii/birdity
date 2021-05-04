import { BrowserRouter as Router, Switch } from 'react-router-dom';

import ContextProvider from './context/Context';
import Topbar from './components/topbar/Topbar';
import LeftMenu from './components/leftMenu/LeftMenu';

const App = () => {
  
  return (
    <>
      <ContextProvider>               
        <Topbar />
        <LeftMenu />
        <Router>
          <Switch>

          </Switch>
        </Router>
      </ContextProvider>
    </>
  );
};

export default App;
