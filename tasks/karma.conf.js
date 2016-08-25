// Karma configuration
// Generated on Wed Jun 24 2015 12:13:39 GMT+0200 (CEST)

const PATH = require('./PATH');
const path = require('path');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'sinon-chai', 'commonjs'],
    frameworks: ['jasmine', 'jasmine-matchers', 'commonjs'],

    // list of files / patterns to load in the browser
    files: PATH.src.lib.js.concat([
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/angular-material/angular-material-mocks.js',

      './test/**/*.js',
    ]).filter(js => !js.endsWith('.map')).map(js => '.' + js).concat([
      {
        pattern: '../test/i18n/*.json',
        watched: false,
        included: false,
        served: true
      }
    ]),

    proxies: {
      '/i18n/': ['http://localhost:9876/absolute', path.resolve(__dirname, '..'), '/test/i18n/'].join('')
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../node_modules/ue-platform/index.js': ['commonjs'],
      '../node_modules/ue-platform/lib/test/**/*.js': ['commonjs'],
      '../test/**/!(at-)*.js': ['commonjs'],
      '../test/components/**/!(*.spec)+(.js)': ['coverage']
    },

    // Generate json used for remap-istanbul
    coverageReporter: {
      dir: path.join('..', PATH.dest.test.report),
      reporters: [
        { type: 'json', subdir: 'report-json' }
      ]
    },

    // plugins: [
    //   'karma-jasmine',
    //   'karma-mocha-reporter'
    // ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
