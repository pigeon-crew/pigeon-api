import React from 'react';
import Main from './Main';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
