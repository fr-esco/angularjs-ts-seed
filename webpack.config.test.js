'use strict';

const PATH = require('./tasks/PATH');

const path = require('path'),
  pkg = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',

  module: {
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        loader: 'baggage?[file].spec.ts'
      }
    ],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, exclude: [/\.e2e\.tsx?$/], loader: 'ts' },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname)) + '/app/!html'
      },
    ]
  },
  entry: './app/app.ts',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new ngAnnotatePlugin({
      add: true,
      // other ng-annotate options here
    }),
    new CopyWebpackPlugin([{
      from: './node_modules/angular-i18n/angular-locale_+(en|it).js',
      to: 'lib',
      flatten: true
    }]),
  ]
};
