import React from 'react';
import WeatherDisplay from './WeatherDisplay';
import CitySelect from './CitySelect';

window.onload = () => {
    React.render(<CitySelect/>, document.getElementById('CitySelectGoesHere1'));
    React.render(<CitySelect/>, document.getElementById('CitySelectGoesHere2'));
    React.render(<WeatherDisplay/>, document.getElementById('WeatherDisplayGoesHere1'));
    React.render(<WeatherDisplay/>, document.getElementById('WeatherDisplayGoesHere2'));
};
