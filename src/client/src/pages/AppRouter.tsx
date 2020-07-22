import React from 'react';
import Main from './Main';
import Signup from './Signup';
import AddFriends from './onboarding/AddFriends';
import Dashboard from './Dashboard';
import Links from './Links';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import FAQ from './FAQ';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/onboarding" component={AddFriends} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/links" component={Links} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
