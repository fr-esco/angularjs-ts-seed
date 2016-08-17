'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');

var join = require('path').join;
var yargs = require('yargs');

var electron = require('electron-connect').server.create();
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var express = require('express');
var openResource = require('open');

var url = [PATH.dest.server.host, PATH.dest.server.port].join(':');
var port = PATH.dest.server.port;

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function (path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

gulp.task('open.browser', function () {
  openResource(url);
});

gulp.task('open.electron', function () {
  electron.start();
});

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev'], function () {
  var argv = yargs.reset()
    .usage('Usage: gulp serve.dev [-e] [-b]')
    .alias('b', 'browser')
    .boolean('b')
    .default('b', false)
    .describe('b', 'Start in browser')
    .alias('e', 'electron')
    .boolean('e')
    .default('e', false)
    .describe('e', 'Start in electron')

    .alias('s', 'support')
    .help('s')
    .argv;

  var app = express();

  $.livereload.listen();
  watch(PATH.src.lib.js.concat(PATH.src.lib.css), function () {
    gulp.start('build.lib.dev', () => argv.electron && electron.reload());
  });
  watch(PATH.src.app.dev.concat('!./app/components/environment/*.ts'), function () {
    gulp.start('build.js.dev', () => argv.electron && electron.reload());
  });
  watch(PATH.src.html.directive, function () {
    gulp.start('build.html.dev', () => argv.electron && electron.reload());
  });
  watch(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'], function () {
    gulp.start('build.assets.dev', () => argv.electron && electron.reload());
  });
  watch(injectableDevAssetsRef(), function () {
    gulp.start('build.index.dev', () => argv.electron && electron.reload());
  });
  watch(PATH.src.scss, function () {
    gulp.start('build.styles.dev', () => argv.electron && electron.reload());
  });

  app.use('*/components', express.static(join(__dirname, '..', 'app', 'components')));
  app.use('*/lib', express.static(join(__dirname, '..', PATH.dest.dev.lib)));
  app.use(express.static(join(__dirname, '..', PATH.dest.dev.all)));
  app.get('/*', function (req, res) {
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

  app.listen(port, function () {
    argv.browser && openResource(url);
    argv.electron && electron.start();
  });
});

// --------------
// Serve prod.

gulp.task('serve.prod', ['build.prod'], function () {
  var argv = yargs.reset()
    .usage('Usage: gulp serve.prod [-e] [-b]')
    .alias('b', 'browser')
    .boolean('b')
    .default('b', false)
    .describe('b', 'Start in browser')
    .alias('e', 'electron')
    .boolean('e')
    .default('e', false)
    .describe('e', 'Start in electron')

    .alias('s', 'support')
    .help('s')
    .argv;

  var app = express();

  watch('./app/**', function () {
    gulp.start('build.app.prod', () => argv.electron && electron.reload());
  });

  app.use('*/components', express.static(join(__dirname, '..', 'app', 'components')));
  app.use('*/lib', express.static(join(__dirname, '..', PATH.dest.prod.lib)));
  app.use(express.static(join(__dirname, '..', PATH.dest.prod.all)));
  app.get('/*', function (req, res) {
    // console.log(req.url);
    var resource = (/([.a-z-]+\.(css|js))/.exec(req.url) || [])[0];
    if (resource) {
      var index = req.url.indexOf('components');
      if (index > -1) {
        resource = req.url.substring(index, req.url.indexOf('?'));
      }
      // console.log(req.url, resource);
      res.sendFile(join(__dirname, '..', PATH.dest.prod.all, resource));
    } else
      res.sendFile(join(__dirname, '..', PATH.dest.prod.all, 'index.html'));
  });

  app.listen(port, function () {
    argv.browser && openResource(url);
    argv.electron && electron.start();
  });
});

function serve() {
  var argv = yargs.reset()
    .usage('Usage: gulp serve -p [-e] [-b]')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment and serve')
    .alias('b', 'browser')
    .boolean('b')
    .default('b', false)
    .describe('b', 'Start in browser')
    .alias('e', 'electron')
    .boolean('e')
    .default('e', false)
    .describe('e', 'Start in electron')

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
  '-b, --browser': 'Start in browser',
  '-e, --electron': 'Start in electron',
  '-s, --support': 'Show help'
};

gulp.task('serve', serve);
