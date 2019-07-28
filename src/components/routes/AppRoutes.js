import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import PrivateRoute from "./PrivateRoute";


import Home from "../Home";
import Login from "../userManagement/auth/Login";
import Register from "../userManagement/auth/Register";
import Answer from '../Answer';
import Questions from '../Questions';
import Candidate from '../Candidate';
import configuration from '../Configurations';

class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/answer" exact component={Answer} />
        <PrivateRoute path="/questions" exact component={Questions} />
        <PrivateRoute path="/candidate" exact component={Candidate} />
        <PrivateRoute path="/configuration" exact component={configuration} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
       
        <Route
          path="/*"
          component={() => {
            return "Page Not found";
          }}
        />
      </Switch>
    );
  }
}

export default AppRoutes;
