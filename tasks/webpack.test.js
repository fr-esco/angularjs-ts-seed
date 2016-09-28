'use strict';

const PATH = require('./PATH');

const extend = require('extend');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigTest = require('../webpack.config.test');

const version = require('../package').version;

gulp.task('webpack.build.test', done => {
  runSequence('clean.test', 'webpack.build.app.test', done);
});

gulp.task('webpack.build.app.test', done => {
  runSequence('webpack.build.assets.test', done);
});

gulp.task('webpack.build.assets.test', ['webpack.build.js.test', 'build.copy.locale.json.test'], done => {
  $.util.log($.util.colors.green('Application built successfully.'));
  done();
});

gulp.task('webpack.build.js.test', ['lint.dts', 'environment.dev'], done => {
  webpack(extend(true, webpackConfigTest, {
    output: {
      path: PATH.dest.test.all,
    }
  }), (err, stats) => {
    if (err)
      throw new $.util.PluginError({
        plugin: 'webpack.build.js.test',
        message: ['Webpack Build Error',
          $.util.colors.red(err)].join('\n\t')
      });
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0)
      return $.util.log($.util.colors.red(jsonStats.errors));
    if (jsonStats.warnings.length > 0)
      $.util.log($.util.colors.yellow(jsonStats.warnings));
    done();
  });
});
