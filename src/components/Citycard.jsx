import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinusCircle, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import icons from '../data/icons';
import { Component } from 'react';
import Forecast from './Forecast';

class Citycard extends Component {
  constructor(props) {
    super();
    this.state = {
      displayForecast: false,
    };
  }

  handleHeart = (city, lat, lon) => {
    this.props.handleHeart(city, lat, lon);
  };

  handleForecast = () => {
    const { displayForecast } = this.state;
    this.setState({ displayForecast: !displayForecast });
  };

  render() {
    const { city, currentWeather, country, handleClick, isFavorite } = this.props;
    const { current, daily, lat, lon } = currentWeather;
    const { humidity, temp, weather, wind_speed } = current;
    const { displayForecast } = this.state;
    const weatherDescription = weather[0].description;
    const currentIcon = () => {
      const icon = icons.find(obj => obj.type === weather[0].main);
      return icon ? <FontAwesomeIcon icon={icon.icon} /> : '';
    };
    return (
      <div className="border rounded-md mt-5 px-5 pb-5 w-72">
        <span className="relative -top-3 ml-2 left-60 pl-1 w-20">
          <FontAwesomeIcon icon={faTimesCircle} className="text-white text-2xl" onClick={handleClick} />
        </span>
        <div className="mt-0 text-center">
          <h1 className="text-2xl">
            {city}, {country} <span> </span>
            {currentIcon()}
          </h1>

          <p className="text-sm">
            {weatherDescription.replace(weatherDescription.split('')[0], weatherDescription.split('')[0].toUpperCase())}
          </p>
          <p className="text-5xl">{Math.round(temp - 273.15)} º </p>
          <p>Humidity: {humidity} %</p>
          <p>Wind: {Math.round(wind_speed)} m/s</p>
        </div>
        <div className="text-center pt-3 pb-2">
          <FontAwesomeIcon
            icon={displayForecast ? faMinusCircle : faPlusCircle}
            className="text-white text-xl mr-3"
            onClick={this.handleForecast}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-white text-xl ${isFavorite && 'text-red-500'}`}
            onClick={() => this.handleHeart(city, lat, lon)}
          />
        </div>
        <Forecast forecast={daily} icons={icons} displayForecast={displayForecast} />
      </div>
    );
  }
}

export default Citycard;
