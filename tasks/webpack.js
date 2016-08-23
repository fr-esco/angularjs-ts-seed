'use strict';

const PATH = require('./PATH');

const extend = require('extend');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const version = require('../package').version;

gulp.task('webpack.build.dev', done => {
  runSequence('clean.dev', ['webpack.build.lib.dev', 'webpack.build.app.dev'], done);
});

gulp.task('webpack.build.lib.dev', () => {
  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('webpack.build.app.dev', done => {
  runSequence('clean.app.dev', 'webpack.build.assets.dev', 'webpack.build.index.dev', done);
});

gulp.task('webpack.build.index.dev', () => {
  const target = gulp.src(injectableDevAssetsRef(), { read: false }).pipe($.plumber());
  return gulp.src('./app/index.html')
    .pipe($.plumber())
    .pipe($.inject(target, { transform: transformPath('dev') }))
    .pipe($.plumber())
    .pipe($.template({ VERSION: getVersion() }))
    .pipe($.plumber())
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('webpack.build.assets.dev', ['webpack.build.js.dev', 'webpack.build.copy.assets.dev', 'build.copy.locale.dev', 'build.copy.locale.json.dev'], done => {
  done();
});

gulp.task('webpack.build.js.dev', ['lint.ts', 'lint.dts', 'environment.dev'], done => {
  webpack(extend(true, webpackConfig, {
    output: {
      path: PATH.dest.dev.all,
    }
  }), (err, stats) => {
    if (err)
      throw new $.util.PluginError({
        plugin: 'webpack.build.js.dev',
        message: ['Webpack Build Error',
          $.util.colors.red(err)].join('\n\t')
      });
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0)
      return $.util.log($.util.colors.red(jsonStats.errors));
    if (jsonStats.warnings.length > 0)
      return $.util.log($.util.colors.yellow(jsonStats.warnings));
    done();
  });
});

gulp.task('webpack.build.copy.assets.dev', () => {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.dev.all, 'assets')));
});

function getVersion() {
  return version;
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return $.inject.transform.apply($.inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function (path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}
