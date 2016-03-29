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
var Builder = require('systemjs-builder');
var yargs = require('yargs');

var appProdBuilder = new Builder({
  baseURL: 'file:./tmp',
});

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

gulp.task('build.lib.dev', function() {
  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(gulp.dest(PATH.dest.dev.lib))
    .pipe($.livereload());
});

gulp.task('build.js.dev', ['lint.ts'], function() {
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

gulp.task('build.html.dev', ['lint.html'], function() {
  return gulp.src(PATH.src.html.directive)
    .pipe(ngHtml2Js({
      moduleName: 'tpl' || function(file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('components');
        return 'app.' + pathParts.slice(root, -1).map(function(folder) {
          return folder.replace(/-[a-z]/g, function(match) {
            return match.substr(1).toUpperCase();
          });
        }).join('.');
      }
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.copy.assets.dev', function() {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.dev.all, 'assets')))
    .pipe($.livereload());
});

gulp.task('build.assets.dev', ['build.js.dev', 'build.html.dev', 'build.copy.assets.dev', 'build.styles.dev'], function() {
  return gulp.src(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'])
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.index.dev', function() {
  var target = gulp.src(injectableDevAssetsRef(), { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('dev') }))
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.dev.all))
    .pipe($.livereload());
});

gulp.task('build.app.dev', function(done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function(done) {
  runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

// --------------
// Build prod.

gulp.task('build.lib.prod', function() {
  var jsOnly = filter('**/*.js'),
    cssOnly = filter('**/*.css');

  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(jsOnly)
    .pipe(sourcemaps.init())
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(jsOnly.restore())
    .pipe(cssOnly)
    .pipe(concat('lib.css'))
    .pipe(minifyCSS())
    .pipe(cssOnly.restore())
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('build.html.tmp', function() {
  return gulp.src(PATH.src.html.directive)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(ngHtml2Js({
      moduleName: 'tpl' || function(file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('components');
        return 'app.' + pathParts.slice(root, -1).map(function(folder) {
          return folder.replace(/-[a-z]/g, function(match) {
            return match.substr(1).toUpperCase();
          });
        }).join('.');
      }
    }))
    .pipe(concat('partials.js'))
    .pipe(uglify())
    .pipe(gulp.dest('tmp'));
});

gulp.task('build.js.tmp', ['build.html.tmp'], function() {
  var result = gulp.src(['./app/**/*.ts', '!./app/init.ts',
    '!./app/**/*.spec.ts'])
    .pipe(plumber())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest('tmp'));
});

// TODO: add inline source maps (System only generate separate source maps file).
gulp.task('build.js.prod', ['build.js.tmp'], function() {
  gulp.src(['./tmp/partials*.js']).pipe(gulp.dest(PATH.dest.prod.all));
  return appProdBuilder.build('app', join(PATH.dest.prod.all, 'app.js'),
    { minify: true }).catch(console.error.bind(console));
});

gulp.task('build.init.prod', function() {
  var result = gulp.src('./app/init.ts')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template({ VERSION: getVersion() }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.copy.assets.prod', function() {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.prod.all, 'assets')));
});

gulp.task('build.assets.prod', ['build.js.prod', 'build.styles.prod'], function() {
  var filterHTML = filter('*.html');
  var filterCSS = filter('*.css');
  return gulp.src(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'])
    .pipe(filterHTML)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(filterHTML.restore())
    .pipe(filterCSS)
    .pipe(minifyCSS())
    .pipe(filterCSS.restore())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.index.prod', function() {
  var target = gulp.src([join(PATH.dest.prod.lib, 'lib.{css,js}'),
    join(PATH.dest.prod.all, '*.css')], { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('prod') }))
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.app.prod', function(done) {
  // build.init.prod does not work as sub tasks dependencies so placed it here.
  runSequence('clean.app.prod', 'build.init.prod', 'build.assets.prod',
    'build.index.prod', 'build.copy.assets.prod', 'clean.tmp', done);
});

gulp.task('build.prod', function(done) {
  runSequence('clean.prod', 'clean.pkg', 'build.lib.prod', 'clean.tmp', 'build.app.prod',
    done);
});

function getVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function(filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return inject.transform.apply(inject.transform, arguments);
  };
}

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function(path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

function build() {
  var argv = yargs.reset()
    .usage('Usage: gulp build -p')
    .alias('p', 'prod')
    .boolean('p')
    .describe('p', 'Build for Production Environment')

    .alias('s', 'support')
    .help('s')
    .argv;

  if (argv.prod)
    gulp.start('build.prod');
  else
    gulp.start('build.dev');
}

build.description = 'Build for either Development or the requested environment';

build.flags = {
  '-p, --prod': 'Build for Production Environment',
  '-s, --support': 'Show help'
};


gulp.task('build', build);
