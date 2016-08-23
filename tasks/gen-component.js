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
    .usage('Usage: gulp gen:directive -n [string] -p [string] -m [string]')
    .alias('n', 'name')
    .string('n')
    .describe('n', 'Directive name without prefix')
    .alias('m', 'module')
    .string('m')
    .describe('m', 'Module name')
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
        gutil.log(gutil.colors.red('Invalid parent path: it does not exist.'));
        return false;
      }
      return true;
    })
    .argv;
  var name = argv.name;
  var parentPath = argv.path;
  var destPath = join(resolveToComponents(), parentPath);

  var modName = (function() {
    var mod = argv.module && argv.module.length > 0 ? argv.module : null;
    if (!mod) {
      var parts = parentPath.split('/');
      mod = parts[parts.length - 1];
    }
    gutil.log('Module file chosen:', mod);
    return mod;
  })();

  var toComponents = parentPath.split('/').map(function() { return '..'; });
  var prefix = 'tsng';

  return gulp.src(PATH.src.blankTemplates.component)
    .pipe(template({
      name: name,
      fullNameSnake: [prefix, name].join('-'),
      fullName: camel([prefix, name].join('-')),
      upCaseName: cap(camel(name)),
      modName: modName,
      toComponents: toComponents.join('/'),
      path: parentPath
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
      message: 'Remember to register the new ngComponent in <%= options.collector %>.',
      templateOptions: {
        collector: destPath + ' > ' + modName + '.ts'
      },
      onLast: true
    }));
}

generator.description = 'Generate Component template';

generator.flags = {
  '-n, --name': 'Component name',
  '-p, --path': 'Path from Components folder',
  '-m, --module': 'Module name (optional)',
  '-s, --support': 'Show help'
};

gulp.task('gen:component', generator);

function resolveToComponents(glob) {
  return join(__dirname, '..', 'app/components', glob || '');
}
