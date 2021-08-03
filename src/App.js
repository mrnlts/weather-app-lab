import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Favorites from './components/Favorites';
import Home from './components/Home';
class App extends Component {
  constructor() {
    super();
    this.state = {
      myFavorites: [],
      displayHome: true,
      displayFavorites: false,
    }
  }

  showFavorites = (e, arr) => {
    e.preventDefault();
    this.setState({ myFavorites: arr, displayHome: false, displayFavorites: true });
  }
  
  showHome = (e, arr) => {
    e.preventDefault();
    this.setState({ myFavorites: arr, displayHome: true, displayFavorites: false });
  }

  render() {
    const { myFavorites, displayHome, displayFavorites } = this.state;
    return (
      <div className="app flex flex-col items-center h-full w-full">
        <h1 className="flex items-start justify-center text-5xl text-white mb-5 pt-10 md:pt-32">Weather app</h1>
        <Switch>  
          <Route exact path="/favorites">
            {displayFavorites ? <Favorites getHome={this.showHome} myFavorites={myFavorites} displayFavorites={displayFavorites} /> : <Redirect to="/"> <Home getFavorites={this.showFavorites} myFavorites={myFavorites} displayHome={displayHome} /></Redirect> }
          </Route>
          <Route exact path="/">
            {displayHome ? <Home getFavorites={this.showFavorites} displayHome={displayHome} myFavorites={myFavorites} /> : <Redirect to="/favorites"> <Favorites getHome={this.showHome} myFavorites={myFavorites} displayFavorites={displayFavorites}/></Redirect> }
          </Route>
        </Switch>
      </div>
    );
  }
}
      

export default App;
