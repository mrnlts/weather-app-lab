import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Forecast extends Component {
  hideForecast = () => {
    this.props.handleForecast();
  };

  render() {
    const { isHidden, forecast } = this.props;
    return (
      <div className={isHidden && 'hidden'}>
        <div className="flex flex-col">
          <ul>
            <li>Tomorrow: {forecast[0].weather[0].description}</li>
            <li>2 days from now: {forecast[1].weather[0].description}</li>
            <li>3 days from now: {forecast[2].weather[0].description}</li>
            <li>...</li>
          </ul>
          <div className="self-center">
            <FontAwesomeIcon icon={faMinusCircle} className="text-white text-2xl" onClick={this.hideForecast} />
          </div>
        </div>
      </div>
    );
  }
}

export default Forecast;
