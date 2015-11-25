var webpackCfg = require('./webpack.config.js');
webpackCfg.externals = {
    sinon: 'sinon'
};


module.exports = function(config) {
    config.set({
        singleRun: true,
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        reporters: ['dots'],
        preprocessors: {
            'src/**/*.jsx': ['webpack']
        },
        webpack: webpackCfg,
        webpackServer: {
            quiet: true
        },
        files: [
            'node_modules/sinon/pkg/sinon.js',
            'src/testutil/karma.setup.jsx'
        ],
        client: {
            mocha: {
                reporter: 'html',
                ui: 'tdd'
            }
        }
    });
};
