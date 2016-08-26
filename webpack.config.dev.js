'use strict';

const PATH = require('./tasks/PATH');

const path = require('path'),
  pkg = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        loader: 'baggage?[file].html&[file].tpl.html&[file].css&[file].scss'
      }
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, exclude: [/\.(spec|e2e)\.tsx?$/], loader: 'ts' },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname)) + '/app/!html'
      },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer', 'sass']
      },
      { test: /\.png$/, loader: 'url?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
      { test: /\.(ttf|woff|woff2|eot)$/, loader: 'file' },
    ]
  },
  // context: __dirname,
  entry: ['./app/app.ts'],
  output: {
    path: PATH.dest.dev.all,
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: PATH.dest.dev.all,
    setup: function (app) {
      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
      // app.get('/some/path', function(req, res) {
      //   res.json({ custom: 'response' });
      // });
      app.use('*/components', require('express').static(path.join(__dirname, 'app', 'components')));
    },
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      filename: 'index.html',
      pkg: pkg,
      template: './app/index.ejs'
    }),
    new ngAnnotatePlugin({
      add: true,
      // other ng-annotate options here
    }),
    new CopyWebpackPlugin([{
      from: './app/assets',
      to: 'assets'
    }]),
    new CopyWebpackPlugin([{
      from: './node_modules/angular-i18n/angular-locale_+(en|it).js',
      to: 'lib',
      flatten: true
    }]),
  ]
};
