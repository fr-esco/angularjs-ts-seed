'use strict';

const PATH = require('./tasks/PATH');

const path = require('path'),
  pkg = require('./package.json'),
  dev = require('./webpack.config.dev');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  module: dev.module,
  entry: dev.entry,
  output: {
    path: PATH.dest.prod.all,
    // publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: PATH.dest.prod.all,
    setup: function (app) {
      app.use('*/components', require('express').static(path.join(__dirname, 'app', 'components')));
    },
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new ngAnnotatePlugin({
      add: true,
      // other ng-annotate options here
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new webpack.optimize.UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false,
      // }, // debug
      // comments: true, //debug
      // verbose: true, //debug

      beautify: false, //prod
      mangle: { screw_ie8: true }, //prod
      compress: { screw_ie8: true }, //prod
      comments: false //prod
    }),
    /**/

    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      filename: 'index.html',
      pkg: pkg,
      template: './app/index.ejs'
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
