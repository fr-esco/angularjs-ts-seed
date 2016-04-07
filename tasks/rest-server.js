'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var jsonServer = require('json-mock');
// var jsonServer = require('json-server');
var gutil = require('gulp-util');

var join = require('path').join;
var openResource = require('open');
var runSequence = require('run-sequence');
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
  server.use(jsonServer.defaults);        // Default middlewares (logger, public, cors)
  // Simple hack
  // server.use('/posts/:postId/comments/:commentId', function(req, res) {
  //   res.redirect('/comments/' + req.params.commentId);
  // });
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

function rest(done) {
  var argv = yargs.reset()
    .usage('Usage: gulp rest [-gr]')
    .alias('g', 'gui')
    .boolean('g')
    .describe('g', 'Open your browser at ' + url)
    .alias('r', 'refresh')
    .boolean('r')
    .describe('r', 'Refresh fake data')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.refresh)
    runSequence('rest.fake', 'rest.server', done);
  else
    runSequence('rest.server', done);
}

rest.description = 'Start a light server that exposes REST APIs for ' + db;

rest.flags = {
  '-g, --gui': 'Open your browser at ' + url,
  '-r, --refresh': 'Refresh fake data',
  '-s, --support': 'Show help'
};

gulp.task('rest', rest);
