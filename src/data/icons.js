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
  
export default icons;