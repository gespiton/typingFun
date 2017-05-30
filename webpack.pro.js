const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const productionConfig = [{
    entry: {
        main: './client/js/entry.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.s([ca])ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: ['file-loader?name=css/font-files/[name].[ext]']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ["transform-remove-strict-mode"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new ExtractTextPlugin({
            filename: 'css/main.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, './client/js/library/jquery.js'),
            jQuery: path.join(__dirname, './client/js/library/jquery.js')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ]
}];

module.exports = productionConfig;
