'use strict';

const PATH = require('./PATH');

const extend = require('extend');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigProd = require('../webpack.config.prod');

const version = require('../package').version;

gulp.task('webpack.build.prod', done => {
  runSequence(['clean.prod', 'clean.pkg.prod'], ['webpack.build.lib.prod', 'webpack.build.app.prod'], done);
});

gulp.task('webpack.build.lib.prod', () => {
  const jsOnly = $.filter('**/*.js', { restore: true }),
    cssOnly = $.filter('**/*.css', { restore: true });

  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(jsOnly)
    .pipe($.sourcemaps.init())
    .pipe($.concat('lib.js'))
    .pipe($.ignore.exclude(['**/*.smap']))
    .pipe($.ngAnnotate())
    .pipe($.uglify().on('error', $.util.log))
    .pipe($.sourcemaps.write())
    .pipe(jsOnly.restore)
    .pipe(cssOnly)
    .pipe($.sourcemaps.init())
    .pipe($.concat('lib.css'))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write())
    .pipe(cssOnly.restore)
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('webpack.build.app.prod', done => {
  runSequence('clean.app.prod', 'webpack.build.assets.prod', 'webpack.build.index.prod', done);
});

gulp.task('webpack.build.index.prod', () => {
  const target = gulp.src(join(PATH.dest.prod.lib, 'lib.{css,js}'), { read: false });
  return gulp.src(join(PATH.dest.prod.all, 'index.html'))
    .pipe($.inject(target, { transform: transformPath('prod') }))
    .pipe($.plumber())
    .pipe($.template({ VERSION: getVersion() }))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('webpack.build.assets.prod', ['webpack.build.js.prod', 'build.copy.locale.json.prod'], done => {
  done();
});

const compilerProd = webpack(extend(true, webpackConfigProd, {
  output: {
    path: PATH.dest.prod.all,
  }
}));
gulp.task('webpack.build.js.prod', ['lint.ts', 'lint.dts', 'environment.prod'], done => {
  webpack(extend(true, webpackConfigProd, {
    output: {
      path: PATH.dest.prod.all,
    }
  }), (err, stats) => {
    if (err)
      throw new $.util.PluginError({
        plugin: 'webpack.build.js.prod',
        message: ['Webpack Build Error',
          $.util.colors.red(err)].join('\n\t')
      });
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0)
      return $.util.log($.util.colors.red(jsonStats.errors));
    if (jsonStats.warnings.length > 0)
      $.util.log($.util.colors.yellow(jsonStats.warnings));
    done();
  });
});

function getVersion() {
  return version;
}

function transformPath(env) {
  var v = '?v=' + getVersion();
  return function (filepath) {
    arguments[0] = filepath.replace('/' + PATH.dest[env].all, '.') + v;
    return $.inject.transform.apply($.inject.transform, arguments);
  };
}

gulp.task('webpack.serve.prod', () => {

  const server = new WebpackDevServer(compilerProd, {
    // webpack-dev-server options

    contentBase: PATH.dest.prod.all,

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false,

    // Set this if you want to enable gzip compression for assets
    compress: true,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    // proxy: {
    //   '*': 'http://localhost:9090'
    // },

    setup: function (app) {
      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
      // app.get('/some/path', function(req, res) {
      //   res.json({ custom: 'response' });
      // });
      app.use('*/components', require('express').static(join(__dirname, '..', 'app', 'components')));
    },

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    staticOptions: {
    },

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    lazy: true,
    filename: 'bundle.js',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // It's a required option.
    // publicPath: "/assets/",
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true }
  });

  server.listen(8080, 'localhost', function () {
    $.util.log('http://localhost:8080')
  });
});
