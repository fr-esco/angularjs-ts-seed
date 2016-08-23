'use strict';

const PATH = require('./PATH');

const extend = require('extend');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const join = require('path').join;
const runSequence = require('run-sequence');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const version = require('../package').version;

gulp.task('webpack.build.dev', done => {
  runSequence('clean.dev', ['webpack.build.lib.dev', 'webpack.build.app.dev'], done);
});

gulp.task('webpack.build.lib.dev', () => {
  return gulp.src(PATH.src.lib.js.concat(PATH.src.lib.css))
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('webpack.build.app.dev', done => {
  runSequence('clean.app.dev', 'webpack.build.assets.dev', 'webpack.build.index.dev', done);
});

gulp.task('webpack.build.index.dev', () => {
  const target = gulp.src(injectableDevAssetsRef(), { read: false }).pipe($.plumber());
  return gulp.src('./app/index.html')
    .pipe($.plumber())
    .pipe($.inject(target, { transform: transformPath('dev') }))
    .pipe($.plumber())
    .pipe($.template({ VERSION: getVersion() }))
    .pipe($.plumber())
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('webpack.build.assets.dev', ['webpack.build.js.dev', 'webpack.build.copy.assets.dev', 'build.copy.locale.dev', 'build.copy.locale.json.dev'], done => {
  done();
});

const compiler = webpack(extend(true, webpackConfig, {
  output: {
    path: PATH.dest.dev.all,
  }
}));
gulp.task('webpack.build.js.dev', ['lint.ts', 'lint.dts', 'environment.dev'], done => {
  webpack(extend(true, webpackConfig, {
    output: {
      path: PATH.dest.dev.all,
    }
  }), (err, stats) => {
    if (err)
      throw new $.util.PluginError({
        plugin: 'webpack.build.js.dev',
        message: ['Webpack Build Error',
          $.util.colors.red(err)].join('\n\t')
      });
    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0)
      return $.util.log($.util.colors.red(jsonStats.errors));
    if (jsonStats.warnings.length > 0)
      return $.util.log($.util.colors.yellow(jsonStats.warnings));
    done();
  });
});

gulp.task('webpack.build.copy.assets.dev', () => {
  return gulp.src(['./app/assets/**/*'])
    .pipe(gulp.dest(join(PATH.dest.dev.all, 'assets')));
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

function injectableDevAssetsRef() {
  var src = PATH.src.lib.js.concat(PATH.src.lib.css).map(function (path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

gulp.task('webpack.serve.dev', () => {

  const server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: PATH.dest.dev.all,
    // or: contentBase: "http://localhost/",

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
    proxy: {
      "*": "http://localhost:9090"
    },

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
    filename: "bundle.js",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    // It's a required option.
    // publicPath: "/assets/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
  });

  server.listen(8080, 'localhost', function () {
    $.util.log('http://localhost:8080')
  });
});
