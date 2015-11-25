import jsdom from 'jsdom';
import eventually from './eventually';


beforeEach(() => {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');

    // We do this to ensure that mocked module functions do not travel between tests
    for (var i in require.cache) {
        delete require.cache[i];
    }

    // Try to pretend we are in a browser
    global.window = document.defaultView;
    global.navigator = {
        userAgent: 'NodeJs JsDom',
        appVersion: ''
    };
    global.history = {};
    global.window.localStorage = {};

    global.eventually = eventually;
});
