var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'bundle.js': [
            'babel-polyfill', path.resolve('./src/app.js')
        ],
        'bundle.css': [
            path.resolve('./src/views/main.less')
        ]
    },

    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'build')
    },

    devtool: 'eval-source-map',

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],

    module: {
        loaders: [{
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    }
};