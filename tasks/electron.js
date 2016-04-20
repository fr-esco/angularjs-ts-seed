'use strict';

var PATH = require('./PATH');

var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron-prebuilt');

gulp.task('electron', function () {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' });
});
