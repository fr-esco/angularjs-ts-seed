// Karma configuration
// Generated on Wed Jun 24 2015 12:13:39 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'sinon-chai', 'commonjs'],
    frameworks: ['jasmine', 'jasmine-matchers', 'commonjs'],


    // list of files / patterns to load in the browser
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/@angular/router/angular1/angular_1_router.js',
      '../node_modules/angular-aria/angular-aria.js',
      '../node_modules/angular-animate/angular-animate.js',
      '../node_modules/angular-messages/angular-messages.js',
      '../node_modules/angular-material/angular-material.js',
      '../node_modules/angular-material/angular-material-mocks.js',
      '../node_modules/angular-cookies/angular-cookies.js',
      // '../node_modules/angular-touch/angular-touch.js',
      '../node_modules/angular-sanitize/angular-sanitize.js',

      '../node_modules/d3/d3.js',
      '../node_modules/nvd3/build/nv.d3.js',
      '../node_modules/angular-nvd3/dist/angular-nvd3.js',

      '../node_modules/codemirror/lib/codemirror.js',
      '../node_modules/codemirror/mode/meta.js',
      '../node_modules/codemirror/mode/css/css.js',
      '../node_modules/codemirror/mode/xml/xml.js',
      '../node_modules/codemirror/mode/javascript/javascript.js',
      '../node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
      '../node_modules/codemirror/mode/sass/sass.js',
      '../node_modules/codemirror/addon/display/autorefresh.js',
      '../node_modules/angular-ui-codemirror/src/ui-codemirror.js',

      '../node_modules/showdown/dist/showdown.min.js',
      '../node_modules/showdown/dist/showdown.min.js.map',
      '../node_modules/ng-showdown/dist/ng-showdown.min.js',
      '../node_modules/ng-showdown/dist/ng-showdown.min.js.map',

      '../node_modules/angular-typescript/lib/at-angular.js',
      '../node_modules/angular-typescript/lib/at-angular-resource.js',

      '../test/**/*.js',
      '../test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../test/**/!(at-)*.js': ['commonjs'],
      '../test/components/**/!(*.spec)+(.js)': ['coverage'],
    },

    // Generate json used for remap-istanbul
    coverageReporter: {
      dir: '../test/report/',
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
    //browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
