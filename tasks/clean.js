'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var del = require('del');
var join = require('path').join;

gulp.task('clean', function(done) {
  del(PATH.dest.all, done);
});

gulp.task('clean.dev', function(done) {
  del(PATH.dest.dev.all, done);
});

gulp.task('clean.app.dev', function(done) {
  // TODO: rework this part.
  del([join(PATH.dest.dev.all, '**/*'), '!' +
    PATH.dest.dev.lib, '!' + join(PATH.dest.dev.lib, '*')], done);
});

gulp.task('clean.prod', function(done) {
  del(PATH.dest.prod.all, done);
});

gulp.task('clean.app.prod', function(done) {
  // TODO: rework this part.
  del([join(PATH.dest.prod.all, '**/*'), '!' +
    PATH.dest.prod.lib, '!' + join(PATH.dest.prod.lib, '*')], done);
});

gulp.task('clean.pkg', function(done) {
  del(PATH.dest.pkg.prod, done);
});

gulp.task('clean.tmp', function(done) {
  del('tmp', done);
});

gulp.task('clean.test', function(done) {
  del('test', done);
});
