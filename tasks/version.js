'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var bump = require('gulp-bump');

var runSequence = require('run-sequence');
var semver = require('semver');

var semverReleases = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];

registerBumpTasks();

gulp.task('bump.reset', function() {
  return gulp.src('package.json')
    .pipe(bump({ version: '0.0.0' }))
    .pipe(gulp.dest('./'));
});

function registerBumpTasks() {
  semverReleases.forEach(function(release) {
    var semverTaskName = 'semver.' + release;
    var bumpTaskName = 'bump.' + release;
    gulp.task(semverTaskName, function() {
      var version = semver.inc(getVersion(), release);
      return gulp.src('package.json')
        .pipe(bump({ version: version }))
        .pipe(gulp.dest('./'));
    });
    gulp.task(bumpTaskName, function(done) {
      runSequence(semverTaskName, 'build.app.prod', done);
    });
  });
}

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}
