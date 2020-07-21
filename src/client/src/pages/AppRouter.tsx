import React from 'react';
import Main from './Main';
import Signup from './Signup';
import AddFriends from './onboarding/AddFriends';
import Dashboard from './Dashboard';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/onboarding" component={AddFriends} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
