var path = require('path');

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: './index.jsx',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'index.js',
        sourceMapFilename: 'index.map'
    },
    module: {
        loaders: [
            {
                test: /src\/.*\.jsx$/,
                loader: 'babel-loader',
                query: {
                    optional: ['es7.classProperties', 'es7.objectRestSpread', 'spec.protoToAssign'],
                    loose: ['es6.classes']
                }
            }
        ]
    },
    resolve: {
        root: path.join(__dirname, '/src'),
        extensions: ['', '.js', '.jsx']
    }
};
