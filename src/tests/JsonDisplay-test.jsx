import { assert } from 'chai';


describe('JsonDisplay', () => {
    let React, TestUtils, JsonDisplay;

    beforeEach(() => {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        JsonDisplay = require('../JsonDisplay');
    });

    it('Renders <pre> with given json inside', () => {
        let element = TestUtils.renderIntoDocument(
            <JsonDisplay json={{hey: 'Whatcha gonna do'}}/>
        );
        let pre = TestUtils.findRenderedDOMComponentWithTag(element, 'pre');
        assert.include(pre.getDOMNode().textContent, 'Whatcha gonna do');
    });

});
