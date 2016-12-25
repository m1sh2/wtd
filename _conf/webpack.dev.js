const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConf = require('./webpack.conf.js');

const webpackDevConf = merge(webpackConf, {
  devtool: 'cheap-source-map'
});

module.exports = webpackDevConf;
