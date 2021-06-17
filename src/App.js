import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  constructor() {
    super()
    this.state = {
      weather: []
    }
}
  componentDidMount() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => this.setState({weather: res.data.weather}));
  }
  render() {
    const { weather } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {weather.map(weather => <div><h1>Status: {weather.main}</h1><p>Description: { weather.description}</p></div>)}
          <img src={logo} className="App-logo" alt="logo" />
          <a
          className="App-link"
          href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            More details coming soon...
            </a>
        </header>
      </div>
    );
  }
}
      

export default App;
