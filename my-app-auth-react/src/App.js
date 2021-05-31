import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/Login/Login';
import useToken from './components/App/useToken';


function App() {
  const { token, setToken } = useToken();
  useEffect(() => {

  }, [token])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Application</h1>
        {!token && <Login className="login-form" setToken={setToken} />
          // < BrowserRouter >
          //   <Switch>
          //     <Route path="/login" default>
          //       <Login className="login-form" setToken={setToken} />
          //     </Route>
          //     <Route path="/signIn">
          //       <Preferences />
          //     </Route>
          //   </Switch>
          // </BrowserRouter>
        }
        {
          < BrowserRouter >
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/preferences">
                <Preferences />
              </Route>
            </Switch>
          </BrowserRouter>}
      </header>
    </div >
  );
}

export default App;
