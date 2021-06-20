import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import cities from './data/city.list.json';
import Citycard from './components/Citycard';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor() {
    super()
    this.state = {
      cities: cities,
      selectedCities: [],
      query: '',
      current: '',
      random: '',
      country: ''
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
    selectedCities = e.target.value === '' ? [] : selectedCities;
    this.setState({ query: e.target.value, selectedCities: selectedCities })
  }

  handleClick = (e) => {
    const { id } = e.target;
    const country = e.target.innerHTML.split(',')[1];
    console.log(e)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => this.setState({ selectedCities: [], query: '', current: res.data, country }))
  }

  handleClickRandom = () => {
    const { cities } = this.state;
    const {id} = cities[Math.round(Math.random() * cities.length)];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(res => this.setState({ selectedCities: [], query: '', current: res.data}))
  }

  deleteCurrent = () => this.setState({ current: '' });
  deleteRandom = () => this.setState({ random: '' });

  render() {
    const { query, selectedCities, current, random, country } = this.state;
    return (
      <div className="app flex flex-col items-center h-full w-full pt-32">
        <Link to="/" className="flex items-start justify-center text-5xl text-white mb-5">
          <h1>Weather app</h1>
        </Link>
        <form className="text-center w-80">
          <div className="bg-gray-100 bg-opacity-30 flex items-center justify-start rounded-full p-3 px-9">
            <input type="text" onChange={this.handleChange} value={query} className="bg-transparent placeholder-white text-xl w-full" placeholder="Type your city..." />
            <FontAwesomeIcon icon={faSearch} className="text-white"/> 
            </div>
          <div className="mx-auto h-10 pl-9 text-left"> 
            {selectedCities.map((city, index) => <h1 key={index} id={city.id} className="cursor-pointer" onClick={this.handleClick}>{city.name}, {city.country}</h1>)}
          </div>
        </form>
        {current ? <Citycard city={current} country={country} handleClick={this.deleteCurrent}/> : random ? <Citycard city={random} country={country} handleClick={this.deleteRandom}/> : ''}
        <h1 className="cursor-pointer text-gray-500 absolute bottom-10 text-lg" onClick={this.handleClickRandom}>Check a random city</h1>
      </div>
    );
  }
}
      

export default App;
