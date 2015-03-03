module.exports = {
  context: __dirname + '/app',
  entry: './app.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
