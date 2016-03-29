'use strict';

var PATH = require('./PATH');

var fs = require('fs');
var gulp = require('gulp');
var zip = require('gulp-zip');
var pkg = require('../package.json');
var gutil = require('gulp-util');
var path = require('path');

gulp.task('build.prod.zip', ['build.prod'], function() {

    // Gets the name and the current version of the project from the package.json file
    var filename = pkg.name + '_v' + pkg.version + '.zip';

    return gulp.src(PATH.dest.prod.all + '/**/*.*')
        .pipe(zip(filename))
        .pipe(gulp.dest(PATH.dest.pkg.prod));

});
