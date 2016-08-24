const path = require('path'),
  extend = require('extend'),
  pkg = require('./package.json');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

// const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
// const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = extend(true, webpackConfig, {
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
    })
  ]
});
