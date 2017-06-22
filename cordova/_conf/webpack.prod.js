const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConf = require('./webpack.conf.js');

const webpackProdConf = merge(webpackConf, {
  output: {
    path: path.resolve(__dirname, '../www'),
    publicPath: './',
    filename: 'js/app.bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
});

module.exports = webpackProdConf;
