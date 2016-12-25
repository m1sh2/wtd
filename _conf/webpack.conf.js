const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const webpackConf = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../_src/app/main.js'),
      path.resolve(__dirname, '../_src/assets/css/styles.css')
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, '../www'),
    publicPath: './',
    filename: 'js/app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: 'file?name=images/[name].[ext]',
        include: path.join(__dirname, '../_src/assets/images')
      },
      {
        test: /\.css$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader'),
        include: path.join(__dirname, '../_src/assets/css')
      },
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, '../_src/app') },
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    // new webpack.optimize.CommonsChunkPlugin('styles', 'css/styles.bundle.css'),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    }),
    new extractTextPlugin('css/styles.bundle.css')
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};

module.exports = webpackConf;
