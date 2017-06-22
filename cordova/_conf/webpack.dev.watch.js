const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const browserSyncPlugin = require('browser-sync-webpack-plugin');
const webpackConf = require('./webpack.conf.js');

const webpackDevConf = merge(webpackConf, {
  devtool: 'cheap-source-map',
  watch: true,
  plugins: [
    new browserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 5050,
      server: {
        baseDir: ['./www']
      }
    })
  ]
});

module.exports = webpackDevConf;
