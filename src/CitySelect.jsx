import React from 'react';
import WeatherStore from './WeatherStore';


export default class CitySelect extends React.Component {

    constructor() {
        super();
        this.state = {
            city: undefined
        };
    }

    componentDidMount() {
        this.unsub = WeatherStore.listen(this.onWeatherLoaded);
    }

    componentWillUnmount() {
        this.unsub();
    }

    onWeatherLoaded = (city) => {
        this.setState({city: city});
    }

    onChange = (ev) => {
        ev.preventDefault();
        WeatherStore.fetchWeather(ev.target.value);
    }

    render() {
        return (
            <select value={this.state.city} onChange={this.onChange}>
                <option value="">---</option>
                <option value="Oslo">Oslo</option>
                <option value="Bergen">Bergen</option>
            </select>
        );
    }
}
