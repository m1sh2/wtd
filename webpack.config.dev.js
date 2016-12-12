var webpackMerge = require('webpack-merge');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var commonConfig = require('./webpack.config.common.js');

var host = 'http://localhost:8000';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new DefinePlugin({
      'API': JSON.stringify(host + '/api/'),
      'HOST': JSON.stringify(host),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});