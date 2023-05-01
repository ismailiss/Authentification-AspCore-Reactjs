import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

function AppWrapper(){
  return  (
  <Provider store={store}>
  <App />
</Provider>
);
}

 
export default AppWrapper;
