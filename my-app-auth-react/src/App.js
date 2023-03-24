import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';
import { createBrowserHistory } from 'history';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Profile from './components/Profile/Profile';
import Deconnexion from './components/Deconnexion/Deconnexion';
import { useHistory } from 'react-router-dom';




function App() {

  const { token, setToken } = useToken();
  useEffect(() => {
  }, [token])

  return (
    <div className="App">

        {!token &&
          <BrowserRouter >
        <Navbar />

            <Switch>
              <Route path="/login" default>
                <Login className="login-form" setToken={setToken} />
              </Route>
              <Route path="/signIn">
                <Signin />
              </Route>
              <Route path="/">
              <Login className="login-form" setToken={setToken} />
              </Route>
            </Switch>
          </BrowserRouter>
        }
        {token &&
          <BrowserRouter >
                  <Navbar />

            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
              <Route path="/Profile">
                <Profile />
              </Route>
              
              <Route path="/Login">
              <Login className="login-form" setToken={setToken} />
              </Route>
              
              
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
            <Deconnexion ></Deconnexion>
          </BrowserRouter>}


    </div >
  );
}

export default App;
