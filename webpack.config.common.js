var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var output = 'dist';

module.exports = {
  entry: {
    'app': './src/main.ts'
  },
  output: {
    path: './',
    filename: output + '/js/[name].bundle.js',
    sourceMapFilename: output + '/js/[name].bundle.map',
    chunkFilename: output + '/js/[id].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loader: 'raw'
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'file-loader?name=[name].[ext]&publicPath=dist/images&outputPath=dist/images/'
      // }
      {
        test: /\.(png|jpe?g|gif|cur)$/,
        // loader: 'file?name=/assets/images/[name].[ext]',
        loader: 'file-loader?name=[name].[ext]&publicPath=dist/images&outputPath=dist/images/',
        include: './src/files/images'
      },
      {
        test: /pixi.js/,
        loader: 'script'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      './src' // location of your src
    ),
    new WebpackBuildNotifierPlugin({
      sound: false
    }),
    new CopyWebpackPlugin([
      {
        from: './src/files/images/*.png',
        to: output + '/images',
        flatten: true
      },
      {
        from: './src/files/audio/*.*',
        to: output + '/audio',
        flatten: true
      },
      {
        from: './src/files/fonts',
        to: output + '/fonts',
        flatten: true
      },
      {
        from: './node_modules/phaser/build/*.min.js',
        to: output + '/js/vendors',
        flatten: true
      },
      {
        from: './node_modules/phaser/build/*.map',
        to: output + '/js/vendors',
        flatten: true
      }
    ], {
      ignore: [
      ],
      copyUnmodified: true
    }),
  ]
};