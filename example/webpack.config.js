const webpack = require('webpack');

module.exports = {
  entry: [
    './javascripts/index.tsx'
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.css']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    // new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  output: {
    filename: 'bundle.js',
    library: 'react-xterm',
    libraryTarget: 'umd'
  }
};
