'use strict';

var PATH = require('./PATH');

var fs = require('fs');
var gulp = require('gulp');
var electron = require('gulp-electron-packager');
var rename = require("gulp-rename");
var zip = require('gulp-zip');
var pkg = require('../package.json');
var gutil = require('gulp-util');

var path = require('path');
var runSequence = require('run-sequence');
var yargs = require('yargs');

gulp.task('build.prod.zip', ['build.prod'], function () {

  // Gets the name and the current version of the project from the package.json file
  var filename = pkg.name + '_v' + pkg.version + '.zip';

  return gulp.src(PATH.dest.prod.all + '/**/*.*')
    .pipe(zip(filename))
    .pipe(gulp.dest(PATH.dest.pkg.prod));

});

gulp.task('build.prod.electron.package', function () {
  return gulp.src('package.json')
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.prod.electron.config', function () {
  return gulp.src('electron.conf.package.js')
    .pipe(rename(pkg.main))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.prod.electron', ['build.prod'], function () {
  return runSequence(
    'build.prod.electron.config',
    'build.prod.electron.package'
  );
});

gulp.task('build.prod.win64', ['build.prod.electron'], function () {
  var argv = require('yargs').reset()
    .usage('Usage: gulp build.prod.win32 -n')
    .alias('n', 'name')
    .string('n')
    .default('n', 'showcase')
    .describe('n', 'Application Name')

    .alias('s', 'support')
    .help('s')
    .argv;

  var options = {
    name: argv.name,
    appname: argv.name,
    appVersion: pkg.version,

    dir: PATH.dest.prod.all,
    out: PATH.dest.pkg.prod,
    platform: 'win32',
    arch: 'x64',
    prune: true,
    overwrite: true,
    version: pkg.devDependencies['electron-prebuilt'].substr(1)
    // ignore: '(ts|packages)'
  };

  // return electron(options, console.error.bind(console));
  return gulp.src('')
    .pipe(electron(options, console.error.bind(console)));

});
