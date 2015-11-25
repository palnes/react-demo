import { assert } from 'chai';


describe('WeatherDisplay', () => {
    let React, TestUtils, WeatherDisplay;

    beforeEach(() => {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        WeatherDisplay = require('../WeatherDisplay');
    });

    it('Displays empty div by default', () => {
        let renderer = TestUtils.createRenderer();
        renderer.render(
            <WeatherDisplay/>
        );
        let element = renderer.getRenderOutput();
        assert.equal(element.type, 'div');
        assert.isUndefined(element.props.children);
    });

    it('Displays title and JsonDisplay if weather and city are given in props', () => {
        let JsonDisplay = require('../JsonDisplay');
        let renderer = TestUtils.createRenderer();
        renderer.render(
            <WeatherDisplay city="London" weather={{weather: 'Rain, of course'}}/>
        );
        let element = renderer.getRenderOutput();
        assert.equal(element.props.children[0].type, 'h4');
        assert.include(element.props.children[0].props.children, 'London');
        assert.equal(element.props.children[1].type, JsonDisplay);
        assert.deepEqual(element.props.children[1].props.json, {weather: 'Rain, of course'});
    });

    it('Displays title and JsonDisplay after callback from WeatherStore', () => {
        let element = TestUtils.renderIntoDocument(
            <WeatherDisplay/>
        );
        element.onWeatherLoaded('Moscow', {weather: 'Snow'});
        let h4 = TestUtils.findRenderedDOMComponentWithTag(element, 'h4');
        assert.include(h4.getDOMNode().textContent, 'Moscow');
        let pre = TestUtils.findRenderedDOMComponentWithTag(element, 'pre');
        assert.include(pre.getDOMNode().textContent, 'Snow');
    });

});
