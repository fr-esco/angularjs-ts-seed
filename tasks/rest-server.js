'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var jsonServer = require('gulp-json-srv');
var gutil = require('gulp-util');

var join = require('path').join;
var openResource = require('open');

gulp.task('rest.server', function() {

  var db = join(PATH.dest.test.all, PATH.dest.test.rest.db);

  jsonServer.start({
    data: db,
    port: PATH.dest.test.rest.port
  });

  openResource('http://localhost:' + PATH.dest.test.rest.port);
});
