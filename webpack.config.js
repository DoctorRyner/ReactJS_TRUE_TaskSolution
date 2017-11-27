let path = require('path')

module.exports = {
    entry: './JS/main.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } }
        ]
    }
}