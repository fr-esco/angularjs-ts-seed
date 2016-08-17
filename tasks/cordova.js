'use strict';

// https://github.com/apache/cordova-lib/tree/rel/6.2.0/cordova-lib/src/cordova

const PATH = require('./PATH');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const log = $.util.log;

const cordova = require('cordova-lib').cordova.raw;
const path = require('path');
const runSequence = require('run-sequence');
const yargs = require('yargs');

let cordovaPlatform;

function platform() {
  return cordovaPlatform;
}

function outputApk() {
  log('Packaged to:');
  log([
    '            ',
    $.util.colors.cyan(path.join('cordova', 'platforms', 'android', 'build', 'outputs', 'apk'))
  ].join(' '));
}

gulp.task('build.cordova.copy.dev', function () {
  return gulp.src(PATH.dest.dev.all + '/**/*.*')
    .pipe(gulp.dest(PATH.dest.cordova.www));
});

gulp.task('build.cordova.dev', function (cb) {
  runSequence('cordova.clean', 'build.dev', 'build.cordova.copy.dev', () => {
    process.chdir('cordova');
    cordova
      .build({ platforms: [platform()] })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('cordova.emulate.dev', function (cb) {
  runSequence('cordova.clean', 'build.dev', 'build.cordova.copy.dev', () => {
    process.chdir('cordova');
    cordova
      .emulate({ platforms: [platform()], livereload: true, consolelogs: true })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('cordova.run.dev', function (cb) {
  runSequence('cordova.clean', 'build.dev', 'build.cordova.copy.dev', () => {
    process.chdir('cordova');
    cordova
      .run({ platforms: [platform()] })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('build.cordova.copy.prod', function () {
  return gulp.src(PATH.dest.prod.all + '/**/*.*')
    .pipe(gulp.dest(PATH.dest.cordova.www));
});

gulp.task('build.cordova.prod', function (cb) {
  runSequence('cordova.clean', 'build.prod', 'build.cordova.copy.prod', () => {
    process.chdir('cordova');
    cordova
      .build({ platforms: [platform()] })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('cordova.emulate.prod', function (cb) {
  runSequence('cordova.clean', 'build.prod', 'build.cordova.copy.prod', () => {
    process.chdir('cordova');
    cordova
      .emulate({ platforms: [platform()], livereload: true, consolelogs: true })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('cordova.run.prod', function (cb) {
  runSequence('cordova.clean', 'build.prod', 'build.cordova.copy.prod', () => {
    process.chdir('cordova');
    cordova
      .run({ platforms: [platform()] })
      .then(function () {
        process.chdir('..');
        outputApk();
        cb();
      });
  });
});

gulp.task('cordova.clean', function (cb) {
  runSequence('clean.cordova.www', () => {
    process.chdir('cordova');
    cordova
      .clean({ platforms: [platform()] })
      .then(function () {
        process.chdir('..');
        cb();
      });
  });
});

function cordovaTask() {
  const argv = yargs.reset()
    .usage('Usage: gulp cordova [-t <build | emulate | run>] -p <android | ...> [-e <dev | prod>]')

    .alias('e', 'env')
    .choices('e', ['dev', 'prod'])
    .default('e', 'dev')
    .describe('e', 'Target environment')

    .alias('t', 'task')
    .choices('t', ['build', 'emulate', 'run'])
    .default('t', 'run')
    .describe('t', 'Cordova task')

    .alias('p', 'platform')
    .default('p', 'android')
    .choices('p', ['android'])
    .describe('p', 'Target platform')

    .alias('s', 'support')
    .help('s')
    .argv;
  cordovaPlatform = argv.platform;

  let gulpTask;
  if (argv.task === 'build') {
    gulpTask = ['build', 'cordova', argv.env].join('.');
  } else {
    gulpTask = ['cordova', argv.task, argv.env].join('.');
  }
  gulp.start(gulpTask);
}

cordovaTask.description = 'Package Cordova application for the specified environment/platform';

cordovaTask.flags = {
  '-t, --task': 'Cordova task',
  '-e, --env': 'Target environment',
  '-p, --platform': 'Target platform',
  '-s, --support': 'Show help'
};

gulp.task('cordova', cordovaTask);
