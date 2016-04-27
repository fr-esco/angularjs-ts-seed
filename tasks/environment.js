var PATH = require('./PATH');

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var gutil = require('gulp-util');

var del = require('del');
var _ = require('lodash');
var join = require('path').join;
var yargs = require('yargs');

var version = require('../package.json').version;

var expected = {
  'endpoint': {
    'apiBase': ''
  }
};
function compare(a, b) {
  return _.reduce(a, function (result, value, key) {
    if (_.isObject(value))
      return result && compare(value, b[key]);
    return result && typeof value === typeof b[key];
  }, true);
}
function verifyConfig(configFile) {
  var constants = require(join('..', configFile));
  if (!compare(expected, constants) || !compare(constants, expected)) {
    throw new gutil.PluginError({
      plugin: 'environment.generate.dev',
      message: 'Bad configuration: ' + configFile
    });
  }
}

gulp.task('environment.generate.dev', function () {
  var jsonName = getJsonName('dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName);
  verifyConfig(configFile);
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

gulp.task('environment.generate.prod', function () {
  var jsonName = getJsonName('prod');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName);
  verifyConfig(configFile);
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

gulp.task('environment.cleanup.dev', ['environment.generate.dev'], function () {
  var jsonName = getJsonName('dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return gulp.src(configFile)
    .pipe(rename('config.ts'))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(configPath));
});

gulp.task('environment.cleanup.prod', ['environment.generate.prod'], function () {
  var jsonName = getJsonName('prod');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return gulp.src(configFile)
    .pipe(rename('config.ts'))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(configPath));
});

gulp.task('environment.dev', ['environment.cleanup.dev'], function () {
  var jsonName = getJsonName('dev');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return del([configFile]);
});

gulp.task('environment.prod', ['environment.cleanup.prod'], function () {
  var jsonName = getJsonName('prod');
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return del([configFile]);
});

function getJsonName(env) {
  return ['config-', env || 'dev', '.json'].join('');
}

function environment() {
  var argv = yargs.reset()
    .usage('Usage: gulp environment [--env <dev | prod>]')

    .alias('e', 'env')
    .choices('e', ['dev', 'prod'])
    .default('e', 'dev')
    .describe('e', 'Target environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.env === 'prod')
    gulp.start('environment.prod');
  else
    gulp.start('environment.dev');
}

environment.description = 'Setup configuration for either Development or the requested environment';

environment.flags = {
  '-e, --env': 'Target environment',
  '-s, --support': 'Show help'
};

gulp.task('environment', environment);
