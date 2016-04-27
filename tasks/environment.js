var PATH = require('./PATH');

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var del = require('del');
var join = require('path').join;
var yargs = require('yargs');

var version = require('../package.json').version;

gulp.task('environment.generate', function () {
  var argv = yargs.reset()
    .usage('Usage: gulp environment -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Setup for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;


  var jsonName = getJsonName(argv.prod ? 'prod' : 'dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName);
  return gulp.src(configFile)
    .pipe(ngConstant({
      name: 'app.components.environment',
      deps: [], // false to add the constants to an existing module
      constants: { version: version },
      merge: true,
      space: '  ',
      templatePath: 'generator/constant.ts',
      wrap: false
    }))
    .pipe(gulp.dest(configPath));
});

gulp.task('environment.cleanup', ['environment.generate'], function () {
  var argv = yargs.reset()
    .usage('Usage: gulp environment -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Setup for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;


  var jsonName = getJsonName(argv.prod ? 'prod' : 'dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return gulp.src(configFile)
    .pipe(rename('config.ts'))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(configPath));
});

function getJsonName(env) {
  return ['config-', env || 'dev', '.json'].join('');
}

function environment() {
  var argv = yargs.reset()
    .usage('Usage: gulp environment -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Setup for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  var jsonName = getJsonName(argv.prod ? 'prod' : 'dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return del([configFile]);
}

environment.description = 'Setup configuration for either Development or the requested environment';

environment.flags = {
  '-p, --prod': 'Setup for Production Environment',
  '-s, --support': 'Show help'
};

gulp.task('environment', ['environment.cleanup'], environment);
