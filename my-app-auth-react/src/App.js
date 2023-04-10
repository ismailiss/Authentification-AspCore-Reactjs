import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Signin from './Views/Signin/Signin';
import Profile from './Views/Profile/Profile';
import Dashboard from './Views/Dashboard/Dashboard';
import Preferences from './Views/Preferences/Preferences';
import Login from './Views/Login/Login';

import NavigationMenu from './containers/navs/NavigationMenu/NavigationMenu';

import { Provider } from 'react-redux';
import store from './store/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {

  const theme = createTheme();

  return (

    <Provider store={store}>
      <ThemeProvider theme={theme}>

        <div className="App">
          <BrowserRouter >
            <NavigationMenu  ></NavigationMenu>
            <Switch>
              <Route exact path="/" component={Dashboard} />

              <Route path="/dashboard" component={Dashboard} />

              <Route path="/preferences" component={Preferences} />

              <Route path="/profile" component={Profile} />

              <Route path="/signIn" component={Signin} />

              <Route path="/login" component={Login}>
                <Login className="login-form" />
              </Route>

            </Switch>
          </BrowserRouter>

        </div >
      </ThemeProvider>
    </Provider>



  );
}

export default App;
