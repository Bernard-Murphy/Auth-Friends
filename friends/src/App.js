import React from 'react';
import './App.css';
import Login from './components/Login';
import Friends from './components/Friends';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Friend from './components/Friend';

function App() {
  return (
    <div className="App">
      <Route path="/login">
        <h2>You must login to continue</h2>
        <Login/>
      </Route>
      <PrivateRoute exact path="/friends" component={Friends}/>
      <PrivateRoute path="/friends/:id" component={Friend}/>
    </div>
  );
}

export default App;
