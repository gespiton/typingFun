var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    devtool: '#source-map',
    entry: [
        './public/js/entry.js',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
    ]
    ,
    output: {
        filename: './[name]/bundle.js',
        path: '/',
        publicPath: publicPath
    },
    // devtool: 'eval-source-map',
    // module: {
    //     rules: [{
    //         test: /\.(png|jpg)$/,
    //         use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]'
    //     }, {
    //         test: /\.scss$/,
    //         use: [
    //             'style-loader',
    //             'css-loader?sourceMap',
    //             'resolve-url-loader',
    //             'sass-loader?sourceMap'
    //         ]
    //     }]
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = devConfig;