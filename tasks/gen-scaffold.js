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
    .usage('Usage: gulp gen:scaffold -n [string] -f [string]')
    .alias('n', 'name')
    .demand('n')
    .string('n')
    .describe('n', 'Component name')
    .alias('f', 'folder')
    .string('f')
    .default('f', '')
    .describe('f', 'Parent folder from Components')

    .alias('c', 'controller')
    .boolean('c')
    .default('c', false)
    .describe('c', 'Prefer Controller to Component')
    .alias('d', 'directive')
    .boolean('d')
    .default('d', false)
    .describe('d', 'Prefer Directive to Component')
    .alias('p', 'provider')
    .boolean('p')
    .default('p', false)
    .describe('p', 'Prefer Provider to Service')

    .alias('s', 'support')
    .help('s')
    .check(function(args) {
      if (!/^[a-z-]+$/.test(args.name)) {
        gutil.log(gutil.colors.red('Invalid name: only lowercase letters are allowed.'));
        return false;
      }
      if (!exists.sync(join(resolveToComponents(), args.folder))) {
        gutil.log(gutil.colors.red('Invalid folder path: it does not exist.'));
        return false;
      }
      return true;
    })
    .argv;
  var name = argv.name;
  var parentPath = argv.folder;
  var destPath = join(resolveToComponents(), parentPath, name);

  var modName = (function() {
    var parts = parentPath.split('/');
    if (parts[0] === '')
      return camel(name);
    gutil.log('Parts of path', parts);
    if (parts[parts.length - 1] !== name)
      parts.push(name);
    parts = parts.map(camel);
    gutil.log('Parts camelCased', parts);
    return parts.join('.');
  })();

  var toComponents = parentPath.split('/').map(function() { return '..'; });
  var prefix = 'tsfn';

  return gulp.src(useTemplates(argv))
    .pipe(template({
      name: name,
      fullNameSnake: [prefix, name].join('-'),
      fullName: camel([prefix, name].join('-')),
      upCaseName: cap(camel(name)),
      modName: modName,
      toComponents: toComponents.join('/'),
      path: join(parentPath, name)
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

generator.description = 'Generate Scaffold template';

generator.flags = {
  '-n, --name': 'Scaffolded Component name',
  '-f, --folder': 'Parent path from Components folder',
  '-c, --controller': 'Prefer Controller to Component',
  '-d, --directive': 'Prefer Directive to Component (and to Controller)',
  '-p, --provider': 'Prefer Provider to Service',
  '-s, --support': 'Show help'
};

gulp.task('gen:scaffold', generator);

function resolveToComponents(glob) {
  return join(__dirname, '..', 'app/components', glob || '');
}

function useTemplates(argv) {
  var service = argv.provider ? 'provider' : 'service',
    component = argv.directive ? 'directive' : (argv.controller ? 'controller' : 'component'),
    templates = PATH.src.blankTemplates, output = [];
  output = output.concat(templates.mod);
  output = output.concat(templates.filter);
  output = output.concat(templates[service]);
  output = output.concat(templates[component]);
  // console.log('Sources:', output);
  return output;
}
