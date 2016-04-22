'use strict';

var PATH = require('./PATH');

var fs = require('fs');
var gulp = require('gulp');
var electron = require('gulp-electron-packager');
var rename = require('gulp-rename');
var pkg = require('../package.json');

var runSequence = require('run-sequence');
var yargs = require('yargs');

registerElectronEnvPkgTasks();

function registerElectronEnvPkgTasks() {
  ['dev', 'prod'].forEach(function (env) {

    gulp.task(['build', 'electron', env, 'package'].join('.'), function () {
      return gulp.src('package.json')
        .pipe(gulp.dest(PATH.dest[env].all));
    });

    gulp.task(['build', 'electron', env, 'config'].join('.'), function () {
      return gulp.src('electron.conf.package.js')
        .pipe(rename(pkg.main))
        .pipe(gulp.dest(PATH.dest[env].all));
    });

    gulp.task(['build', 'electron', env].join('.'), [['build', env].join('.')], function () {
      return runSequence(
        ['build', 'electron', env, 'config'].join('.'),
        ['build', 'electron', env, 'package'].join('.')
      );
    });

    var taskName = ['package', 'electron', env, 'win32'].join('.');
    gulp.task(taskName,
      [['build', 'electron', env].join('.')],
      function () {
        var argv = yargs.reset()
          .usage('Usage: gulp ' + taskName + ' -n <appname>')
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

          dir: PATH.dest[env].all,
          out: PATH.dest.pkg[env],
          platform: 'win32',
          arch: 'ia32',
          prune: true,
          overwrite: true,
          version: pkg.devDependencies['electron-prebuilt'].substr(1)
        };

        return gulp.src('')
          .pipe(electron(options, console.error.bind(console)));
      });

    taskName = ['package', 'electron', env, 'win64'].join('.');
    gulp.task(taskName,
      [['build', 'electron', env].join('.')],
      function () {
        var argv = yargs.reset()
          .usage('Usage: gulp ' + taskName + ' -n <appname>')
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

          dir: PATH.dest[env].all,
          out: PATH.dest.pkg[env],
          platform: 'win32',
          arch: 'x64',
          prune: true,
          overwrite: true,
          version: pkg.devDependencies['electron-prebuilt'].substr(1)
        };

        return gulp.src('')
          .pipe(electron(options, console.error.bind(console)));
      });

  });
}

function electronTask() {
  var argv = yargs.reset()
    .usage('Usage: gulp electron -n <appname> -p <win32 | win64> [-e <dev | prod>]')
    .alias('n', 'name')
    .string('n')
    .default('n', 'showcase')
    .describe('n', 'Application Name')

    .alias('e', 'environment')
    .choices('e', ['dev', 'prod'])
    .default('e', 'dev')
    .describe('e', 'Target environment')

    .alias('p', 'platform')
    .choices('p', ['win32', 'win64'])
    .describe('p', 'Target platform')

    .alias('s', 'support')
    .help('s')
    .argv;

  gulp.start(['package', 'electron', argv.environment, argv.platform].join('.'));
}

electronTask.description = 'Package Electron application for the specified environment/platform';

electronTask.flags = {
  '-n, --name': 'Application Name',
  '-e, --environment': 'Target environment',
  '-p, --platform': 'Target platform',
  '-s, --support': 'Show help'
};

gulp.task('electron', electronTask);
