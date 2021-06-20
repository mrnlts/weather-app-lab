import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faCloudSun,
  faWind,
  faSmog,
  faSun,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  {
    type: 'Rain',
    icon: faCloudRain,
  },
  {
    type: 'Clear',
    icon: faSun,
  },
  {
    type: 'Clouds',
    icon: faCloud,
  },
  {
    type: 'Bolt',
    icon: faBolt,
  },
  {
    type: 'HeavyRain',
    icon: faCloudShowersHeavy,
  },
  {
    type: 'Snow',
    icon: faSnowflake,
  },
  {
    type: 'CloudSun',
    icon: faCloudSun,
  },
  {
    type: 'Wind',
    icon: faWind,
  },
  {
    type: 'Mist',
    icon: faSmog,
  },
];

const Citycard = props => {
  const { city, country, handleClick } = props;
  const { name, weather, main, wind } = city;
  const currentIcon = () => {
    const icon = icons.find(obj => obj.type === weather[0].main);
    return icon ? <FontAwesomeIcon icon={icon.icon} /> : '';
  };

  return (
    <div className="border rounded-md px-5 pb-5 w-72">
      <span className="relative -top-3 ml-2 left-60 pl-1 w-20">
        <FontAwesomeIcon icon={faTimesCircle} className="text-white text-2xl" onClick={handleClick} />
      </span>
      <div className="mt-0">
        <h1 className="text-2xl">
          {name}, {country} <span> </span>
          {currentIcon()}
        </h1>

        <p>Current weather: {weather[0].description} </p>
        <p>
          Temperature: {Math.round((main.temp - 273.15) * 1.8 + 32)} ºF / {Math.round(main.temp - 273.15)} ºC{' '}
        </p>
        <p>Humidity: {main.humidity} %</p>
        <p>Wind speed: {Math.round(wind.speed)}m/s</p>
      </div>
    </div>
  );
};

export default Citycard;
