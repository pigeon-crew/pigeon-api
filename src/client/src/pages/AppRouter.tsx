import React from 'react';
import Main from './Main';
import Signup from './Signup';
import SocketTest from './SocketTest';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/socket" component={SocketTest} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
