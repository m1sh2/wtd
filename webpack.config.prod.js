var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var commonConfig = require('./webpack.config.common.js');
var fs = require('fs');

var host = 'https://wtd.herokuapp.com';

var packageJson = require('./package.json');
var version = packageJson.version.split('.').map(Number);
version[2]++;
packageJson.version = version.join('.');
fs.writeFile('./package.json', JSON.stringify(packageJson, null, 2));

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