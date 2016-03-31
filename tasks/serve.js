'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');

var join = require('path').join;
var yargs = require('yargs');

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var express = require('express');
var openResource = require('open');

var port = 5555;

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function(path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev'], function() {
  var app = express();

  $.livereload.listen();
  watch(PATH.src.lib.js.concat(PATH.src.lib.css), function() {
    gulp.start('build.lib.dev');
  });
  watch(PATH.src.app.dev, function() {
    gulp.start('build.js.dev');
  });
  watch(PATH.src.html.directive, function() {
    gulp.start('build.html.dev');
  });
  watch(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'], function() {
    gulp.start('build.assets.dev');
  });
  watch(injectableDevAssetsRef(), function() {
    gulp.start('build.index.dev');
  });
  watch(PATH.src.scss, function() {
    gulp.start('build.styles.dev');
  });

  app.use('*/components', express.static(join(__dirname, '..', 'app', 'components')));
  app.use('*/lib', express.static(join(__dirname, '..', PATH.dest.dev.lib)));
  app.use(express.static(join(__dirname, '..', PATH.dest.dev.all)));
  app.get('/*', function(req, res) {
    // console.log(req.url);
    var resource = (/([.a-z-]+\.(css|js))/.exec(req.url) || [])[0];
    if (resource) {
      var index = req.url.indexOf('components');
      if (index > -1) {
        resource = req.url.substring(index, req.url.indexOf('?'));
      }
      // console.log(req.url, resource);
      res.sendFile(join(__dirname, '..', PATH.dest.dev.all, resource));
    } else
      res.sendFile(join(__dirname, '..', PATH.dest.dev.all, 'index.html'));
  });

  app.listen(port, function() {
    openResource('http://localhost:' + port);
  });
});

// --------------
// Serve prod.

gulp.task('serve.prod', ['build.prod'], function() {
  var app = express();

  watch('./app/**', function() {
    gulp.start('build.app.prod');
  });

  // app.use('/', express.static(join(__dirname, '..', PATH.dest.prod.all)));
  // app.use('/components', express.static(join(__dirname, '..', 'app', 'components')));
  // app.use('/lib', express.static(join(__dirname, '..', PATH.dest.prod.lib)));
  // app.all('/*', function(req, res, next) {
  //   // Just send the index.html for other files to support HTML5Mode
  //   res.sendFile('index.html', { root: join(__dirname, '..', PATH.dest.prod.all) });
  // });

  app.use('/components', express.static(join(__dirname, '..', 'app', 'components')));
  app.use(express.static(join(__dirname, '..', PATH.dest.prod.all)));
  app.get('/*', function(req, res) {
    res.sendFile(join(__dirname, '..', PATH.dest.prod.all, 'index.html'));
  });

  app.listen(port, function() {
    openResource('http://localhost:' + port);
  });
});

function serve() {
  var argv = yargs.reset()
    .usage('Usage: gulp serve -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment and serve')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    gulp.start('serve.prod');
  else
    gulp.start('serve.dev');
}

serve.description = 'Build for either Development or the requested environment and serve';

serve.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};


gulp.task('serve', serve);
