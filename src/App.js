import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Topbar from './components/topbar/Topbar';
import LeftMenu from './components/leftMenu/LeftMenu';

const App = () => {
  return (
    <>
      <Topbar />
      <LeftMenu />
      <Router>
        <Switch>

        </Switch>
      </Router>
    </>
  );
};

export default App;
