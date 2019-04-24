const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node', // In order to ignore built-in modules like path, fs, ect.
  entry: {
    app: './src/index.js',
  },
  devtool: 'source-map',
  output: {
    path: resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: 'build/',
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
      { use: 'babel-loader', exclude: /node_modules/, test: /\.js$/ },
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
