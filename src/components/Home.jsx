import React, { Component } from 'react';
import axios from 'axios';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Citycard from './Citycard';
import cities from '../data/city.list.json';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cities,
      city: '',
      country: '',
      currentWeather: '',
      isRed: false,
      query: '',
      selectedCities: [],
    };
  }

  handleChange = e => {
    if (this.state.currentWeather) {
      this.setState({ currentWeather: '' });
    }
    const { cities } = this.state;
    const oldCities = [...cities];
    let selectedCities = [];
    oldCities.map(elem =>
      elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ? selectedCities.push(elem) : null,
    );
    selectedCities = selectedCities.slice(0, 100);
    selectedCities = e.target.value === '' ? [] : selectedCities;
    this.setState({ query: e.target.value, selectedCities: selectedCities });
  };

  handleClick = e => {
    const { innerHTML, id } = e.target;
    const city = innerHTML.split(',')[0];
    const country = innerHTML.split(',')[1];
    const lat = id.split('-')[0];
    const lon = id.split('-')[1];
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`,
      )
      .then(res =>
        this.setState({ selectedCities: [], query: '', city, currentWeather: res.data, country, isRed: false }),
      );
  };

  handleClickRandom = () => {
    const { cities } = this.state;
    const index = Math.round(Math.random() * cities.length);
    const lat = cities[index].coord.lat;
    const lon = cities[index].coord.lon;
    const city = cities[index].name;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`,
      )
      .then(res => this.setState({ selectedCities: [], query: '', city, currentWeather: res.data, isRed: false }));
  };

  handleHeart = () => {
    const { isRed } = this.state;
    this.setState({ isRed: !isRed });
  };

  deleteCurrent = () => this.setState({ currentWeather: '', currentID: '' });

  deleteRandom = () => this.setState({ randomWeather: '', currentID: '' });

  render() {
    const { query, selectedCities, currentWeather, isRed, random, country, lat, lon, city } = this.state;
    const { handleChange, handleClick, handleClickRandom, deleteCurrent, deleteRandom } = this;

    return (
      <div className="flex flex-col items-center">
        <form className="text-center w-80">
          <div className="bg-gray-100 bg-opacity-30 flex items-center justify-start rounded-full p-3 px-9">
            <input
              type="text"
              onChange={handleChange}
              value={query}
              className="bg-transparent placeholder-white text-xl w-full"
              placeholder="Type your city..."
            />
            <FontAwesomeIcon icon={faSearch} className="text-white" />
          </div>

          <div className="mx-auto h-10 pl-9 text-left">
            {selectedCities.map((city, index) => (
              <h1
                key={index}
                id={`${city.coord.lat}-${city.coord.lon}`}
                className="cursor-pointer"
                onClick={handleClick}
              >
                {city.name}, {city.country}
              </h1>
            ))}
          </div>
        </form>

        {currentWeather ? (
          <Citycard
            city={city}
            currentWeather={currentWeather}
            country={country}
            lat={lat}
            lon={lon}
            handleHeart={this.handleHeart}
            handleClick={deleteCurrent}
            isRed={isRed}
          />
        ) : random ? (
          <Citycard
            city={city}
            currentWeather={random}
            country={country}
            lat={lat}
            lon={lon}
            handleClick={deleteRandom}
            handleHeart={this.handleHeart}
            isRed={isRed}
          />
        ) : (
          ''
        )}

        <h1 className="cursor-pointer text-gray-500 absolute bottom-10 text-lg" onClick={handleClickRandom}>
          Check a random city
        </h1>
      </div>
    );
  }
}

export default Home;
