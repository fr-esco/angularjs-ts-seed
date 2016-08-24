'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var del = require('del');
var join = require('path').join;

gulp.task('clean', function(done) {
  del(PATH.dest.all).then(() => done());
});

gulp.task('clean.dev', function(done) {
  del(PATH.dest.dev.all).then(() => done());
});

gulp.task('clean.app.dev', function(done) {
  // TODO: rework this part.
  del([join(PATH.dest.dev.all, '**/*'), '!' +
    PATH.dest.dev.lib, '!' + join(PATH.dest.dev.lib, '*')]).then(() => done());
});

gulp.task('clean.pkg.dev', function(done) {
  del(PATH.dest.pkg.dev).then(() => done());
});

gulp.task('clean.prod', function(done) {
  del(PATH.dest.prod.all).then(() => done());
});

gulp.task('clean.app.prod', function(done) {
  // TODO: rework this part.
  del([join(PATH.dest.prod.all, '**/*'), '!' +
    PATH.dest.prod.lib, '!' + join(PATH.dest.prod.lib, '*')]).then(() => done());
});

gulp.task('clean.pkg.prod', function(done) {
  del(PATH.dest.pkg.prod).then(() => done());
});

gulp.task('clean.tmp', function(done) {
  del('tmp').then(done);
});

gulp.task('clean.test', function(done) {
  del('test').then(() => done());
});

gulp.task('clean.cordova.www', function(done) {
  // TODO: rework this part.
  del(join(PATH.dest.cordova.www, '**/*')).then(() => done());
});
