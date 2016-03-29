'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var htmllint = require('gulp-htmllint');
var tslint = require('gulp-tslint');
var gutil = require('gulp-util');

var runSequence = require('run-sequence');
var yargs = require('yargs');

function htmllintReporter(filepath, issues) {
  if (issues.length > 0) {
    issues.forEach(function(issue) {
      gutil.log([
        gutil.colors.cyan('[gulp-htmllint]'),
        gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']:'),
        gutil.colors.red('(' + issue.code + ') ' + issue.msg)
      ].join(' '));
    });

    process.exitCode = 1;
  }
}

function lintHtml() {
  return gulp.src(PATH.src.html.all)
    .pipe(htmllint({}, htmllintReporter));
}

lintHtml.description = 'Ensure HTML coding standards and best practices are applied using htmllint';

lintHtml.flags = {};

gulp.task('lint.html', lintHtml);

function lintTs() {
  var argv = yargs.reset()
    .usage('Usage: gulp lint.ts -r [string]')
    .alias('r', 'report')
    // .string('r')
    .default({ 'r': 'prose' })
    .choices('r', ['json', 'prose', 'verbose', 'full'])
    .alias('s', 'support')
    .help('s')
    .argv;

  return gulp.src(PATH.src.app.all)
    .pipe(tslint())
    .pipe(tslint.report(argv.report), {
      emitError: false,
      reportLimit: 2,
      summarizeFailureOutput: true
    });
}

lintTs.description = 'Ensure TypeScript coding standards and best practices are applied using tslint';

lintTs.flags = {
  '-r, --report': 'Report for gulp-tslint',
  '-s, --support': 'Show help'
};

gulp.task('lint.ts', lintTs);

function lint() { }

lint.description = 'Ensure coding standards and best practices are applied using linters';

gulp.task('lint', ['lint.html', 'lint.ts'], lint);
