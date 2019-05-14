const path = require('path');
// const webpack = require('webpack');
// const WebpackChunkHash = require('webpack-chunk-hash');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const DashboardPlugin = require('webpack-dashboard/plugin');

// const isDev = process.env.NODE_ENV !== 'production';

const config = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    // filename: isDev ? '[name].js' : '[name].[chunkhash].js'
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'eslint-loader' },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader **/,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //     }),
  //     new OptimizeCSSAssetsPlugin({}),
  //   ],
  //   splitChunks: {
  //     cacheGroups: {
  //       // commons: {
  //       //   test: /[\\/]node_modules[\\/]/,
  //       //   name: 'vendor',
  //       //   chunks: 'all'
  //       // },
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: isDev ? '[name].css' : '[name].[hash].css',
  //     chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
  //   }),
  //   new webpack.HashedModuleIdsPlugin(),
  //   new WebpackChunkHash(),
  //   new DashboardPlugin({ port: 5000 }),
  // ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 5000,
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false,
  },
};

module.exports = config;
