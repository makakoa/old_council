'use strict';

var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './app/app.js',
  output: {
    path: './public',
    publicPath: 'public/',
    filename: 'scripts.min.js'
  },
  module: {
    preLoaders: [{
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jshint-loader'
    }, {
      test:    /\.js$/,
      exclude: /node_modules/,
      loader: 'jscs-loader'
    }],
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};
