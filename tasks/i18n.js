'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var path = require('path');
var join = path.join;
var merge = require('gulp-merge-json');

var locales = ['it', 'en'];

gulp.task('build.copy.locale.json.dev', function() {
  locales.forEach(function(locale) {
    gulp.src('./app/**/' + locale + '.json')
      .pipe(merge('locale-' + locale + '.json'))
      .pipe(gulp.dest(join(PATH.dest.dev.all, 'i18n')));
  });
});

gulp.task('build.copy.locale.json.prod', function() {
  locales.forEach(function(locale) {
    gulp.src('./app/**/' + locale + '.json')
      .pipe(merge('locale-' + locale + '.json'))
      .pipe(gulp.dest(join(PATH.dest.prod.all, 'i18n')));
  });
});
