'use strict';

const PATH = require('./PATH');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');

const version = require('../package').version;

gulp.task('webpack.build.prod', done => {
  runSequence(['clean.prod', 'clean.pkg.prod'], 'webpack.build.lib.prod', 'webpack.build.app.prod', done);
});

gulp.task('webpack.build.lib.prod', () => {
  const jsOnly = $.filter('**/*.js', { restore: true }),
    cssOnly = $.filter('**/*.css', { restore: true });

  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(jsOnly)
    .pipe($.sourcemaps.init())
    .pipe($.concat('lib.js'))
    .pipe($.ignore.exclude(['**/*.smap']))
    .pipe($.ngAnnotate())
    .pipe($.uglify().on('error', $.util.log))
    .pipe($.sourcemaps.write())
    .pipe(jsOnly.restore)
    .pipe(cssOnly)
    .pipe($.sourcemaps.init())
    .pipe($.concat('lib.css'))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write())
    .pipe(cssOnly.restore)
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('webpack.build.app.prod', done => {
  runSequence('clean.app.prod', ['webpack.build.assets.prod', 'webpack.build.index.prod'], done);
});

gulp.task('webpack.build.index.prod', () => {
  const target = gulp.src(join(PATH.dest.prod.lib, 'lib.{css,js}'), { read: false });
  return gulp.src(join(PATH.src.app.root, 'index.html'))
    .pipe($.inject(target, { transform: transformPath('prod') }))
    .pipe($.rename('index.ejs'))
    .pipe($.plumber())
    .pipe(gulp.dest(PATH.src.app.root));
});

gulp.task('webpack.build.assets.prod', ['lint.ts', 'lint.dts', 'environment.prod', 'build.copy.locale.json.prod'], done => {
  $.util.log($.util.colors.green('Application built successfully.'));
  done();
});

function transformPath(env) {
  var v = '?v=' + version;
  return function (filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return $.inject.transform.apply($.inject.transform, arguments);
  };
}
