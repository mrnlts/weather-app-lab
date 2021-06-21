import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
class App extends Component {
  render() {
    return (
      <div className="app flex flex-col items-center h-full w-full pt-32">
        <h1 className="flex items-start justify-center text-5xl text-white mb-5">Weather app</h1>
        <Switch>  
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }
}
      

export default App;
