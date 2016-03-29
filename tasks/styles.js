'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('build.styles.dev', function() {

  var injectFiles = gulp.src(PATH.src.scss, { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace('app/', '');
      // filePath = filePath.replace('components/', '../components/');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.scss');

  return gulp.src('./app/index.scss')
    // .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    // .pipe(indexFilter.restore())
    .pipe($.sass({ errLogToConsole: true }))

    .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.styles.prod', function() {

  var injectFiles = gulp.src(PATH.src.scss, { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace('app/', '');
      // filePath = filePath.replace('components/', '../components/');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var indexFilter = $.filter('index.scss');

  return gulp.src('./app/index.scss')
    .pipe($.inject(injectFiles, injectOptions))
    .pipe($.sass({ errLogToConsole: true }))

    .pipe($.autoprefixer())
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(PATH.dest.prod.all));
});
