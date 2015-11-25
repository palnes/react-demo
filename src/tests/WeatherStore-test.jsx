import { assert } from 'chai';
import simple from 'simple-mock';


describe('WeatherStore', () => {
    let store, callback, stub;

    beforeEach(() => {
        store = require('../WeatherStore');
        callback = simple.stub();
        store.listen(callback);
        let $ = require('jquery');
        stub = simple.mock($, 'get').resolveWith({
            main: {
                weather: 'Rain, of course'
            }
        });
    });

    it('Fetches weather', () => {
        store.fetchWeather('London');

        // eventually(callback) returns Promise that will wait for 10 ms, call `callback` and resolve
        return eventually(() => {
            assert.isTrue(callback.called);
            assert.deepEqual(callback.lastCall.args[0], 'London');
            assert.deepEqual(callback.lastCall.args[1], {weather: 'Rain, of course'});
        });
    });

    it('Does not do ajax if given same params', () => {
        store.fetchWeather('London');

        return eventually(() => {
            assert.equal(stub.calls.length, 1);
            assert.deepEqual(callback.calls[0].args[0], 'London');
            assert.deepEqual(callback.calls[0].args[1], {weather: 'Rain, of course'});

            store.fetchWeather('London');
            assert.equal(stub.calls.length, 1);
            assert.deepEqual(callback.calls[1].args[0], 'London');
            assert.deepEqual(callback.calls[1].args[1], {weather: 'Rain, of course'});

            store.fetchWeather('Oslo');
            assert.equal(stub.calls.length, 2);
        });
    });
});
