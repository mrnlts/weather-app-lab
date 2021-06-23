import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Forecast extends Component {
  render() {
    const { displayForecast, forecast, icons } = this.props;
    const currentIcon = day => {
      const icon = icons.find(obj => obj.type === day);
      return icon ? <FontAwesomeIcon icon={icon.icon} /> : '';
    };
    return (
      <div className={`${!displayForecast && 'hidden'}`}>
        <div className="flex flex-col bg-gray-800 bg-opacity-30 py-2 rounded">
          <div>
            {forecast.map((dailyForecast, index) => {
              const day = new Date(dailyForecast.dt * 1000).toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
              return index !== 0 ? (
                <div key={index} className="text-white flex">
                  <p className="w-28 pl-3">{day}</p>
                  <p className="w-16 text-center">{currentIcon(dailyForecast.weather[0].main)}</p>
                  <div className="w-14 pl-2 flex justify-between">
                    <p>{Math.round(dailyForecast.temp.max - 273.15)}</p>
                    <p className="text-gray-400">{Math.round(dailyForecast.temp.min - 273.15)}</p>
                  </div>
                </div>
              ) : (
                ''
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Forecast;
