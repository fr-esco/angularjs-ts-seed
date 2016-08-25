'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var ngHtml2Js = require('gulp-ng-html2js');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

var karmaServer = require('karma').Server;
var path = require('path');
var join = path.join;
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var yargs = require('yargs');

var merge = require('gulp-merge-json');
var runSequence = require('run-sequence');

var locales = ['it', 'en'];

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript'),
  sourceMap: true
});

gulp.task('build.html.test', function () {
  return gulp.src(PATH.src.html.directive)
    .pipe(ngHtml2Js({
      moduleName: 'tpl' || function (file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('components');
        return 'app.' + pathParts.slice(root, -1).map(function (folder) {
          return folder.replace(/-[a-z]/g, function (match) {
            return match.substr(1).toUpperCase();
          });
        }).join('.');
      },
      prefix: 'components/'
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(PATH.dest.test.all));
});

gulp.task('build.js.test', function () {
  var result = gulp.src(PATH.src.app.test)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(ngAnnotate())
    // .pipe(sourcemaps.write('.'))
    /*.pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: function(file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('app');
        return pathParts.slice(root, -1).map(function() { return '..'; }).concat('app').join('/');
      }
    }))*/
    .pipe(sourcemaps.write('./', {
      sourceRoot: join(__dirname, '..', 'app')
    }))
    .pipe(gulp.dest(PATH.dest.test.all));
});

gulp.task('build.test', ['clean.test'], function (done) {
  runSequence(['build.html.test', 'build.copy.locale.json.test', 'build.js.test'], done);
});

gulp.task('run.karma', ['build.test'], function (done) {
  var argv = yargs.argv;

  new karmaServer({
    configFile: join(__dirname, 'karma.conf.js'),
    singleRun: !argv.debug
  }, karmaDone).start();

  function karmaDone(exitCode) {
    // gutil.log('Test Done with exit code: ' + exitCode);
    if (exitCode === 0) {
      argv.coverage && remapCoverage();
      done();
    } else {
      done('Unit test failed.');
    }
  }
});

function test() {
  yargs.reset()
    .usage('Usage: gulp test --debug --coverage')
    .alias('d', 'debug')
    .boolean('d')
    .describe('d', 'Keep the browser open for debugging')
    .alias('c', 'coverage')
    .boolean('c')
    .describe('c', 'Run code coverage tool and generate HTML report')

    .alias('s', 'support')
    .help('s')
    .argv;

  watch('./app/**', function () {
    gulp.start('run.karma');
  });
  return gulp.start('run.karma');
}

test.description = 'Run Unit Tests';

test.flags = {
  '-d, --debug': 'Keep the browser open for debugging',
  '-c, --coverage': 'Run code coverage tool and generate HTML report',
  '-s, --support': 'Show help'
};

gulp.task('test', test);

function remapCoverage() {
  gutil.log(gutil.colors.blue('Remapping coverage to TypeScript format...'));
  var report = PATH.dest.test.report;
  gulp.src(join(report, 'report-json', 'coverage-final.json'))
    .pipe(remapIstanbul({
      reports: {
        'lcovonly': join(report, 'remap', 'lcov.info'),
        'json': join(report, 'remap', 'coverage.json'),
        'html': join(report, 'remap', 'html-report')
        // 'text-summary': join(report, 'remap', 'text-summary.txt')
      }
    }))
    .on('finish', function () {
      gutil.log(gutil.colors.green('Remapping done! View the result in ' + join(report, 'remap', 'html-report')));
    });
}
