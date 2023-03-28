import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// <Login className="login-form" setToken={setToken} />

import useToken from './helpers/useToken';
import Navbar from './containers/navs/Navbar/Navbar';

import Signin from './Views/Signin/Signin';
import Profile from './Views/Profile/Profile';
import Dashboard from './Views/Dashboard/Dashboard';
import Preferences from './Views/Preferences/Preferences';
import Login from './Views/Login/Login';

import NavigationMenu from './containers/navs/NavigationMenu/NavigationMenu';




function App() {

  const { token, setToken } = useToken();
  useEffect(() => {
  }, [token])

  return (
    <div className="App">
      <BrowserRouter >
      <NavigationMenu token={token} setToken={setToken} ></NavigationMenu>
        <Switch>
        <Route exact path="/" component={Dashboard} />

          <Route path="/dashboard" component={Dashboard}/>

          <Route path="/preferences" component={Preferences}/>

          <Route path="/profile" component={Profile}/>

          <Route path="/signIn" component={Signin}/> 

          <Route path="/login" component={Login}>
            <Login className="login-form" setToken={setToken} />
          </Route>

        </Switch>
      </BrowserRouter>


    </div >
  );
}

export default App;
