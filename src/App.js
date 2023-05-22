import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/settings" component={ Settings } />
        </Switch>
      </main>
    );
  }
}

export default App;
