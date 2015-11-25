import simple from 'simple-mock';
import { assert } from 'chai';


describe('CitySelect', () => {
    let React, TestUtils, CitySelect;

    beforeEach(() => {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        CitySelect = require('../CitySelect');
    });

    it('Calls WeatherStore.fetchWeather on city select', () => {
        let WeatherStore = require('../WeatherStore');
        let stub = simple.mock(WeatherStore, 'fetchWeather').returnWith(null);

        let element = TestUtils.renderIntoDocument(
            <CitySelect/>
        );
        let select = TestUtils.findRenderedDOMComponentWithTag(element, 'select');
        TestUtils.Simulate.change(select, {target: {value: 'Bergen'}});
        assert.isTrue(stub.called);
        assert.equal(stub.lastCall.arg, 'Bergen');
    });

    it('Sets correct selected option on callback from WeatherStore', () => {
        let element = TestUtils.renderIntoDocument(
            <CitySelect/>
        );
        element.onWeatherLoaded('Bergen', {weather: 'Rain, of course'});
        let [osloOption, bergenOption] = TestUtils.scryRenderedDOMComponentsWithTag(element, 'option').slice(1);
        assert.isFalse(osloOption.getDOMNode().selected);
        assert.isTrue(bergenOption.getDOMNode().selected);
    });

});
