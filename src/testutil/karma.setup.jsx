/* global mocha */
/* global sinon */
/* global __webpack_require__ */
import eventually from './eventually';

mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true,
    noHighlighting: true
});


describe('', () => {
    before(() => {
        sinon.useFakeXMLHttpRequest();
    });

    beforeEach(() => {
        window.eventually = eventually;
    });

    afterEach(() => {
        let _ = require('lodash');
        let React = require('react');
        let simple = require('simple-mock');
        simple.restore();
        delete window.eventually;
        for (var i in __webpack_require__.c) {
            delete __webpack_require__.c[i];
        }
        _.map(
            document.querySelectorAll('div'),
            node => {
                if (node.id !== 'mocha') {
                    React.unmountComponentAtNode(node);
                    node.parentNode.removeChild(node);
                }
            }
        );
    });

    // Import all tests
    let testsContext = require.context('..', true, /-test$/);
    testsContext.keys().forEach(testsContext);
});

