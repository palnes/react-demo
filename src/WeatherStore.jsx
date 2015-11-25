import Reflux from 'reflux-core';
import Freezer from 'freezer-js';
import $ from 'jquery';


const WeatherStore = Reflux.createStore({
    init: function () {
        this.params = new Freezer({
            city: null
        }).get();
        this.weather = new Freezer({}).get();
    },

    _trigger: function () {
        this.trigger(this.params.city, this.weather.toJS());
    },

    _fetchWeather: function () {
        $.get(
            `${ this.params.city }.json`
        )
            .then(data => {
                this.weather = this.weather.set(data.main);
                this._trigger();
            });
    },

    fetchWeather: function (city) {
        let newParams = this.params.set('city', city);
        if (newParams !== this.params) {
            this.params = newParams;
            this._fetchWeather();
        } else {
            this._trigger();
        }
    }
});


export default WeatherStore;
