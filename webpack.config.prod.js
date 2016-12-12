var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var commonConfig = require('./webpack.config.common.js');

var host = 'https://wtd.herokuapp.com';

module.exports = webpackMerge.smart(commonConfig, {
  entry: {
    'app': './src/main.aot.ts'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader?aot=true&genDir=public/js/app'
        ]
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new DefinePlugin({
      'API': JSON.stringify(host + '/api/'),
      'HOST': JSON.stringify(host),
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});