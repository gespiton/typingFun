const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');

const publicPath = 'http://' + 'localhost' + ':3000/';
console.log('public address: ', publicPath);
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
const devConfig = {
    devtool: '#source-map',
    entry: {
      main: [
        './app/index.js',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
      ],
      // "materialize": [
      //   './app/styles/js/bin/materialize.js'
      // ]
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
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HappyPack({
        id: 'js',
        threads: 4,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'react-hmre'],
              plugins: [
                'transform-class-properties',
                "transform-decorators-legacy"
              ]
            }
          }
        ]
      }),
      new HappyPack({
          id: 'sass',
          threads: 4,
          loaders: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            },
            {
              loader: "css-loader" // translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        }
      )
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
          use: [{loader: "happypack/loader?id=sass"}]
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
          test: /\.js(x)?$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'happypack/loader?id=js',
            }
          ]
        }
      ]
    }
  }
;

module.exports = devConfig;
