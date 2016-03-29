'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var template = require('gulp-template');
var gutil = require('gulp-util');

var path = require('path');
var join = path.join;
var exists = require('path-exists');
var yargs = require('yargs');

function generator() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  var camel = function(val) {
    return val.split('-').map(function(token, index) {
      if (index === 0) return token;
      return cap(token);
    }).join('');
  };
  var argv = yargs.reset()
    .usage('Usage: gulp gen:module -n [string] -p [string]')
    .alias('n', 'name')
    .string('n')
    .describe('n', 'Module name')
    .alias('p', 'path')
    .string('p')
    .describe('p', 'Path from Components folder')
    .demand(['n', 'p'])

    .alias('s', 'support')
    .help('s')
    .check(function(args) {
      if (!/^[a-z-]+$/.test(args.name)) {
        gutil.log(gutil.colors.red('Invalid name: only lowercase letters are allowed.'));
        return false;
      }
      if (!exists.sync(join(resolveToComponents(), args.path))) {
        gutil.log(gutil.colors.red('Invalid parent path: it does not exists.'));
        return false;
      }
      return true;
    })
    .argv;
  var name = argv.name;
  var parentPath = argv.path;
  var destPath = join(resolveToComponents(), parentPath);

  var modName = (function() {
    var parts = parentPath.split('/');
    gutil.log('Parts of path', parts);
    if (parts[parts.length - 1] !== name)
      parts.push(name);
    parts = parts.map(camel);
    gutil.log('Parts camelCased', parts);
    return parts.join('.');
  })();

  var toComponents = parentPath.split('/').map(function() { return '..'; });

  return gulp.src(PATH.src.blankTemplates.mod)
    .pipe(template({
      name: name,
      upCaseName: cap(camel(name)),
      modName: modName,
      toComponents: toComponents.join('/')
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath))
    .pipe(notify({
      message: 'Module files generated in <%= options.folder %>.',
      templateOptions: {
        folder: destPath
      },
      onLast: true
    })).pipe(notify({
      message: 'Remember to register the new ngModule in <%= options.collector %>.',
      templateOptions: {
        collector: resolveToComponents() + ' > components.ts'
      },
      onLast: true
    }));
}

generator.description = 'Generate Module template';

generator.flags = {
  '-n, --name': 'Module name',
  '-p, --path': 'Path from Components folder',
  '-s, --support': 'Show help'
};

gulp.task('gen:module', generator);

function resolveToComponents(glob) {
  return join(__dirname, '..', 'app/components', glob || '');
}
