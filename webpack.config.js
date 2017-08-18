const webpack = require('webpack');
const path = require('path');

const publicPath = 'http://localhost:3000/';
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const devConfig = {
  devtool: '#source-map',
  entry: {
    main: [
      './client/js/entry.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
    ],
    typingPage: [
      './client/app/typingPage/index.jsx',
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
      $: path.join(__dirname, './client/js/library/jquery.js'),
      jQuery: path.join(__dirname, './client/js/library/jquery.js')
    })
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
        use: ['webpack-module-hot-accept']
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  }
};

module.exports = devConfig;