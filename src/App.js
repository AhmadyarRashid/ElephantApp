import React, { Component } from "react";
import AppRoutes from './components/routes/AppRoutes';
import { BrowserRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode'

import { Provider } from "react-redux";
import store from "./store/store";

import "antd/dist/antd.css";

import setAuthToken from '../src/utils/setAuthToken'
import { setCurrentUser, logoutUser } from '../src/store/actions/authAction'
import 'bootstrap/dist/css/bootstrap.css';

try {
  // Check for token to keep user logged in
  if (localStorage.appvhc_jwt_token) {
    // Set auth token header auth
    const token = localStorage.appvhc_jwt_token;
    if (token) {
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }
}catch(e){
  console.log(e);
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
