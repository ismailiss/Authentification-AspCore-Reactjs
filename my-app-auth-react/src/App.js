import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Signin from './Views/Signin/Signin';
import Profile from './Views/Profile/Profile';
import ProfileEdit from './Views/Profile/ProfileEdit';
import Dashboard from './Views/Dashboard/Dashboard';
import Preferences from './Views/Preferences/Preferences';
import Login from './Views/Login/Login';

import NavigationMenu from './containers/navs/NavigationMenu/NavigationMenu';

import { useSelector } from 'react-redux';
import AppWrapper from './AppWrapper';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const theme = createTheme();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Configure toast options

  return (

    <ThemeProvider theme={theme}>
      <ToastContainer />

      <div className="App">
        <BrowserRouter >
          <NavigationMenu  ></NavigationMenu>
          <Switch>
            <Route exact path="/" component={Dashboard} />

            <Route path="/dashboard" component={Dashboard} />

            <Route path="/preferences" component={Preferences} />
            <Route path="/profile">
              {isAuthenticated ? <Profile /> : <Redirect to="/login" />}
            </Route>
            <Route path="/profiledit">
              {isAuthenticated ? <ProfileEdit /> : <Redirect to="/login" />}
            </Route>


            <Route path="/signIn" component={Signin} />

            <Route path="/login" component={Login}>
              <Login className="login-form" />
            </Route>

          </Switch>
        </BrowserRouter>

      </div >
    </ThemeProvider>



  );
}

export default App;
