'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var $ = require('gulp-load-plugins')();
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var ngHtml2Js = require("gulp-ng-html2js");
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');

var fs = require('fs');
var path = require('path');
var join = path.join;
var runSequence = require('run-sequence');
var yargs = require('yargs');

var HTMLMinifierOpts = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conditionals: true,
  conservativeCollapse: true,
  customAttrCollapse: /ng\-class/,
  lint: true,
  // removeComments: true,
  removeTagWhitespace: true,
};

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

// --------------
// Build dev.

gulp.task('build.lib.dev', function () {
  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(gulp.dest(PATH.dest.dev.lib))
    .pipe($.livereload());
});

gulp.task('build.js.dev', ['lint.ts', 'lint.dts'], function () {
  var result = gulp.src(PATH.src.app.dev)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.html.dev', ['lint.html', 'lint.dts'], function () {
  return gulp.src(PATH.src.html.directive)
    .pipe(ngHtml2Js({
      moduleName: 'tpl' || function (file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('components');
        return 'app.' + pathParts.slice(root, -1).map(function (folder) {
          return folder.replace(/-[a-z]/g, function (match) {
            return match.substr(1).toUpperCase();
          });
        }).join('.');
      }
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.copy.locale.dev', function () {
  return gulp.src(PATH.src.lib.locale)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.copy.assets.dev', function () {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.dev.all, 'assets')))
    .pipe($.livereload());
});

gulp.task('build.assets.dev', ['build.js.dev', 'build.html.dev', 'build.copy.assets.dev', 'build.styles.dev', 'build.copy.locale.dev', 'build.copy.locale.json.dev'], function () {
  return gulp.src(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'])
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.index.dev', function () {
  var target = gulp.src(injectableDevAssetsRef(), { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('dev') }))
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.app.dev', function (done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function (done) {
  runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return inject.transform.apply(inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function (path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}
