'use strict';

var debug = process.env.NODE_ENV !== 'production';
if (debug) console.log('-Running dev build-');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  node: {
    process: true
  },
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './app/app.js',
  output: {
    path: './public',
    publicPath: 'public/',
    filename: 'scripts.min.js'
  },
  module: {
    preLoaders: debug ? [{
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }, {
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }] : [],
    loaders: [{
      test: /\.jsx$/,
      loader: 'jsx-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      'app'
    ]
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
