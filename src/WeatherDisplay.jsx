import React from 'react';
import WeatherStore from './WeatherStore';
import JsonDisplay from './JsonDisplay';


export default class WeatherDisplay extends React.Component {

    static propTypes = {
        city: React.PropTypes.string,
        weather: React.PropTypes.object
    }

    static defaultProps = {
        city: null,
        weather: null
    }

    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            weather: props.weather
        };
    }

    componentDidMount() {
        this.unsub = WeatherStore.listen(this.onWeatherLoaded);
    }

    componentWillUnmount() {
        this.unsub();
    }

    onWeatherLoaded = (city, weather) => {
        this.setState({city: city, weather: weather});
    }

    render() {
        if (!this.state.city || !this.state.weather) {
            return <div />;
        }

        return (
            <div>
                <h4>Weather in {this.state.city}:</h4>
                <JsonDisplay json={this.state.weather}/>
            </div>
        );
    }
}
