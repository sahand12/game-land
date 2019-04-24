const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node', // In order to ignore built-in modules like path, fs, ect.
  entry: {
    app: './api/src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, 'api', './build'),
    filename: 'bundle.js',
    publicPath: 'api/build/',
  },
  externals: [nodeExternals()], // In order to ignore all modules in node_modules folder
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'eslint-loader' },
      },
      {
        use: {
          loader: 'babel-loader',
          options: { configFile: resolve(__dirname, 'api', 'babel.config.js') },
        },
        exclude: /node_modules/,
        test: /\.js$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false,
  },
};
