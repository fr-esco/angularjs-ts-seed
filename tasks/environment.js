var PATH = require('./PATH');

var gulp = require('gulp');
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var del = require('del');
var join = require('path').join;

var version = require('../package.json').version;

gulp.task('config.generate', function () {
  var jsonName = 'config.json';
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

gulp.task('config.cleanup', ['config.generate'], function () {
  var jsonName = 'config.json';
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return gulp.src(configFile)
    .pipe(rename(jsonName.split('.')[0] + '.ts'))
    .pipe(replace('"', '\''))
    .pipe(gulp.dest(configPath));
});

gulp.task('config', ['config.cleanup'], function () {
  var jsonName = 'config.json';
  var configPath = join(PATH.src.app.root, 'components', 'environment'),
    configFile = join(configPath, jsonName.split('.')[0] + '.js');
  return del([configFile]);
});
