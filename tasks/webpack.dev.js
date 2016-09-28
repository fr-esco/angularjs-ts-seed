'use strict';

const PATH = require('./PATH');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');

const version = require('../package.json').version;

gulp.task('webpack.build.dev', done => {
  runSequence('webpack.build.lib.dev', 'webpack.build.app.dev', done);
});

gulp.task('webpack.build.lib.dev', () => {
  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('webpack.build.app.dev', done => {
  runSequence(['webpack.build.assets.dev', 'webpack.build.index.dev'], done);
});

gulp.task('webpack.build.index.dev', () => {
  const target = gulp.src(injectableDevAssetsRef(), { read: false });
  return gulp.src(join(PATH.src.app.root, 'index.html'))
    .pipe($.inject(target, { transform: transformPath('dev') }))
    .pipe($.rename('index.ejs'))
    .pipe($.plumber())
    .pipe(gulp.dest(PATH.src.app.root));
});

gulp.task('webpack.build.assets.dev', ['lint.dts', 'environment.dev', 'build.copy.locale.json.dev'], done => {
  done();
});

function transformPath(env) {
  const v = '?v=' + version;
  return function (filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return $.inject.transform.apply($.inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  return PATH.src.lib.js.concat(PATH.src.lib.css).map(filePath => join(PATH.dest.dev.lib, filePath.split('/').pop()));
}
