import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cities from './data/city.list.json';
class App extends Component {
  constructor() {
    super()
    this.state = {
      cities: cities,
      selectedCities: [],
      query: '',
      current: ''
    }
  }
  
  handleChange = (e) => {
    if (this.state.current) {
      this.setState({ current: '' })
    }
    const { cities } = this.state;
    const oldCities = [...cities];
    let selectedCities = [];
    oldCities.map(elem => elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ? selectedCities.push(elem) : null);
    selectedCities = selectedCities.slice(0, 100)
    this.setState({ query: e.target.value, selectedCities: selectedCities })
  }

  handleClick = (e) => {
    const { id } = e.target;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => { console.log(res); this.setState({ selectedCities: [], query: '', current: res.data })})
  }

  render() {
    const { query, selectedCities, current } = this.state;
    return (
      <div className="app flex flex-col m-auto h-full w-full">
        <div className="bg-gray-100 bg-opacity-50 rounded-3xl flex flex-col items-center justify-center mt-20 mx-auto w-9/12 h-20 mb-5">
        <Link to="/"><h1 className="text-2xl text-white">Weather app</h1></Link>
          </div>
        <form>
          <input type="text" onChange={this.handleChange} value={query} className="border block bg-transparent rounded-md m-auto p-3" placeholder="Type your city..."/>
          <div className="text-center h-10">
            {selectedCities.map((city, index) => <h1 key={index} id={city.id} onClick={this.handleClick}>{city.name}</h1>)}
          </div>
        </form>
        {current ? <div className="mx-auto">
          <h1 className="text-2xl">{current.name}</h1>
          <p>Current weather: {current.weather.description} </p>
          <p>Temperature: {Math.round(((current.main.temp-273.15)*1.8)+32)} ºF / {Math.round(current.main.temp-273.15)} ºC </p>
          <p>Humidity: {current.main.humidity} %</p>
          <p>Wind speed: {Math.round(current.wind.speed)}m/s</p>
          </div> : ''
          }
      </div>
    );
  }
}
      

export default App;
