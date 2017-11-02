const webpack = require('webpack');
const path = require('path');
const localIp = require('./utility/getLocalIp');
if (localIp.length !== 1) {
  throw 'get local ip error!';
}

const publicPath = 'http://' + localIp[0] + ':3000/';
console.log('public address: ', publicPath);
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const devConfig = {
  // devtool: '#source-map',
  entry: {
    main: [
      './app/index.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ]
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, './public'),
    publicPath: publicPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
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
        test: /\.s([ac])ss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader?source-map" // compiles Sass to CSS
          }
        ]
      },

      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader?name=./images/[name].[ext]']
        // include: [path.resolve(__dirname, './client/images')]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'react-hmre'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'react-hmre'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      }
    ]
  }
};

module.exports = devConfig;