import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../data/icons';

const Favorites = props => {
  const { myFavorites, displayFavorites, getHome } = props;
  const currentIcon = day => {
    const icon = icons.find(obj => obj.type === day);
    return icon ? <FontAwesomeIcon icon={icon.icon} /> : '';
  };
  return (
    <div className={`my-auto bg-gray-800 bg-opacity-30 p-2 rounded ${!displayFavorites && 'hidden'}`}>
      <ul>
        {myFavorites.length === 0 ? (
          <li>You have no current favorites!</li>
        ) : (
          myFavorites.map((city, index) => {
            const { forecast } = city;
            const { daily } = forecast;
            return (
              <div key={index} className="flex flex-col p-2">
                <div>
                  {
                    <div className="text-white flex">
                      <p className="w-28 pl-3">{city.city}</p>
                      <p className="w-16 text-center">{currentIcon(daily[0].weather[0].main)}</p>
                      <div className="w-14 pl-2 flex justify-between">
                        <p>{Math.round(daily[0].temp.max - 273.15)}</p>
                        <p className="text-gray-400">{Math.round(daily[0].temp.min - 273.15)}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            );
          })
        )}
      </ul>
      <Link to="/" className="text-white absolute bottom-3 left-36 md:bottom-10 text-lg mx-auto w-24" onClick={getHome}>
        Back home
      </Link>
    </div>
  );
};

export default Favorites;
