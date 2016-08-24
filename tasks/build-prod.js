'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var $ = require('gulp-load-plugins')();
var minifyCSS = require('gulp-clean-css');
var minifyHTML = require('gulp-minify-html');
var ngAnnotate = require('gulp-ng-annotate');
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
  // baseURL: 'file:./tmp',
});

appProdBuilder.config({
  paths: {
  },
  packages: {
    'tmp': {
      main: 'tmp/*',
    },
  },
  map: {
    'app': 'tmp/app.js',
  }
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
// Build prod.

gulp.task('build.lib.prod', function () {
  var jsOnly = filter('**/*.js', { restore: true }),
    cssOnly = filter('**/*.css', { restore: true });

  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(jsOnly)
    .pipe(sourcemaps.init())
    .pipe(concat('lib.js'))
    // .pipe(gulp.dest(PATH.dest.prod.lib))
    .pipe($.ignore.exclude(['**/*.map']))
    .pipe(ngAnnotate())
    .pipe(uglify().on('error', $.util.log))
    .pipe(sourcemaps.write())
    .pipe(jsOnly.restore)
    .pipe(cssOnly)
    .pipe(sourcemaps.init())
    .pipe(concat('lib.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(cssOnly.restore)
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('build.html.tmp', ['lint.html', 'lint.dts'], function () {
  return gulp.src(PATH.src.html.directive)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(ngHtml2Js({
      moduleName: 'tpl' || function (file) {
        var pathParts = file.path.split(path.sep),
          root = pathParts.indexOf('components');
        return 'app.' + pathParts.slice(root, -1).map(function (folder) {
          return folder.replace(/-[a-z]/g, function (match) {
            return match.substr(1).toUpperCase();
          });
        }).join('.');
      },
      prefix: 'components/'
    }))
    .pipe(concat('partials.js'))
    .pipe(uglify())
    .pipe(gulp.dest('tmp'));
});

gulp.task('build.js.tmp', ['lint.ts', 'lint.dts', 'build.html.tmp', 'environment.prod'], function () {
  var result = gulp.src(PATH.src.app.prod)
    .pipe(plumber())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(ngAnnotate())
    .pipe(template({ VERSION: getVersion(), ENV: 'prod' }))
    .pipe(gulp.dest('tmp'));
});

// TODO: add inline source maps (System only generate separate source maps file).
gulp.task('build.js.prod', ['build.js.tmp'], function () {
  // gulp.src(['./tmp/partials*.js']).pipe(gulp.dest(PATH.dest.prod.all));
  return appProdBuilder.bundle('app', './tmp/app.js',
    { minify: true, mangle: true })
    // .then(console.log.bind(console))
    .then(function () {
      return gulp.src(['./tmp/partials*.js', './tmp/app.js'])
        .pipe($.replace('tmp/', ''))
        .pipe($.replace('.js"', '"'))
        .pipe(gulp.dest(join(PATH.dest.prod.all)));
    })
    .catch(console.error.bind(console));
});

gulp.task('build.init.prod', function () {
  var result = gulp.src('./app/init.ts')
    .pipe($.preprocess({ context: { NODE_ENV: 'PRODUCTION', DEBUG: false } }))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe($.ignore.exclude(['**/*.map']))
    .pipe(uglify().on('error', $.util.log))
    .pipe(template({ VERSION: getVersion(), ENV: 'prod' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.copy.assets.prod', function () {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.prod.all, 'assets')));
});

gulp.task('build.copy.locale.prod', function () {
  return gulp.src(PATH.src.lib.locale)
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('build.assets.prod', ['build.js.prod', 'build.styles.prod'], function () {
  var filterHTML = filter('*.html', { restore: true });
  var filterCSS = filter('*.css', { restore: true });
  return gulp.src(['./app/**/!(*.directive|*.component|*.tpl).html', './app/**/*.css'])
    .pipe(filterHTML)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(filterHTML.restore)
    .pipe(filterCSS)
    .pipe(minifyCSS())
    .pipe(filterCSS.restore)
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.index.prod', function () {
  var target = gulp.src([join(PATH.dest.prod.lib, 'lib.{css,js}'),
    join(PATH.dest.prod.all, '*.css')], { read: false });
  return gulp.src('./app/index.html')
    .pipe(inject(target, { transform: transformPath('prod') }))
    .pipe(template({ VERSION: getVersion(), ENV: 'prod' }))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.app.prod', function (done) {
  // build.init.prod does not work as sub tasks dependencies so placed it here.
  runSequence('clean.app.prod', 'build.init.prod', 'build.assets.prod',
    'build.index.prod', 'build.copy.assets.prod', 'build.copy.locale.prod', 'build.copy.locale.json.prod', 'clean.tmp', done);
});

gulp.task('build.prod', function (done) {
  runSequence('clean.prod', 'clean.pkg.prod', 'build.lib.prod', 'clean.tmp', 'build.app.prod',
    done);
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
