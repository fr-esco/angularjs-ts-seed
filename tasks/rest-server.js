'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var jsonServer = require('json-mock');
var gutil = require('gulp-util');

var join = require('path').join;
var openResource = require('open');
var yargs = require('yargs');

var db = join(PATH.dest.test.all, PATH.dest.test.rest.db);
var url = 'http://localhost:' + PATH.dest.test.rest.port;

function server() {
  var argv = yargs.reset()
    .usage('Usage: gulp rest.server [-g]')
    .alias('g', 'gui')
    .boolean('g')
    .describe('g', 'Open your browser at ' + url)

    .alias('s', 'support')
    .help('s')
    .argv;

  // jsonServer.start({
  //   data: db,
  //   port: PATH.dest.test.rest.port
  // });
  var server = jsonServer.create();         // Express server
  server.use(jsonServer.defaults);          // Default middlewares (logger, public, cors)
  server.use(jsonServer.router(db));        // Express router

  server.listen(PATH.dest.test.rest.port);

  if (argv.gui)
    openResource(url);
}

server.description = 'Start a light server that exposes REST APIs for ' + db;

server.flags = {
  '-g, --gui': 'Open your browser at ' + url,
  '-s, --support': 'Show help'
};

gulp.task('rest.server', server);
