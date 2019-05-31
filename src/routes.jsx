import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from './pages/home/Home';
import Login from './pages/login';
// import Demo from './pages/demo';
// import Framework from './layout/Framework';
// import LeadConversion from './pages/leadConversion';

export default (
    <Route>
        <Switch>
            <Redirect from="/" to="/login" exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
        </Switch>
   </Route>
);
