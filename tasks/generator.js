'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var template = require('gulp-template');
var gutil = require('gulp-util');

var join = require('path').join;
var exists = require('path-exists');
var yargs = require('yargs');

function component() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  var argv = yargs.reset()
    .usage('Usage: gulp component -n [string] -p [string]')
    .alias('n', 'name')
    .demand('n')
    .string('n')
    .describe('n', 'Component name')
    .alias('p', 'parent')
    .string('p')
    .default('p', '')
    .describe('p', 'Parent path from Components folder')

    .alias('s', 'support')
    .help('s')
    .check(function(args) {
      if (!/^[a-z]+$/.test(args.name)) {
        gutil.log(gutil.colors.red('Invalid name: only lowercase letters are allowed.'));
        return false;
      }
      if (!exists.sync(join(resolveToComponents(), args.parent))) {
        gutil.log(gutil.colors.red('Invalid parent path: it does not exists.'));
        return false;
      }
      return true;
    })
    .argv;
  var name = argv.name;
  var parentPath = argv.parent;
  var destPath = join(resolveToComponents(), parentPath, name);

  return gulp.src(PATH.src.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath))
    .pipe(notify({
      message: 'Component files generated in <%= options.folder %>.',
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

component.description = 'Generate Component template';

component.flags = {
  '-n, --name': 'Component name',
  '-p, --parent': 'Parent path from Components folder',
  '-s, --support': 'Show help'
};

gulp.task('component', component);

function resolveToComponents(glob) {
  return join(__dirname, '..', 'app/components', glob || '');
}
