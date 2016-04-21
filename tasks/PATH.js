var join = require('path').join;
var generator = join(__dirname, '..', 'generator', 'component');

module.exports = {
  dest: {
    all: 'dist',
    dev: {
      all: 'dist/dev',
      lib: 'dist/dev/lib'
    },
    test: {
      all: 'test',
      report: 'test/report',
      rest: {
        port: 3000,
        db: 'db.json'
      }
    },
    prod: {
      all: 'dist/prod',
      lib: 'dist/prod/lib'
    },
    pkg: {
      prod: 'dist/pkg/prod'
    },
    server: {
      host: 'http://localhost',
      port: 5555
    }
  },
  src: {
    app: {
      root: './app',
      all: ['./app/**/*.ts'],
      dev: ['./app/**/*.ts', '!./app/**/*.spec.ts'],
      test: ['./app/**/*.ts', '!./app/init.ts'],
      prod: ['./app/**/*.ts', '!./app/init.ts', '!./app/**/*.spec.ts']
    },
    // Order is quite important here for the HTML tag injection.
    lib: {
      js: [
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/angular/angular.js',
        //'./node_modules/@angular/router/angular1/angular_1_router.js',
        './node_modules/ngComponentRouter-patched/angular_1_router.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-messages/angular-messages.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-cookies/angular-cookies.js',
        // './node_modules/angular-touch/angular-touch.js',
        './node_modules/angular-sanitize/angular-sanitize.js',

        './node_modules/d3/d3.js',
        './node_modules/nvd3/build/nv.d3.js',
        './node_modules/angular-nvd3/dist/angular-nvd3.js',

        './node_modules/codemirror/lib/codemirror.js',
        './node_modules/codemirror/mode/meta.js',
        './node_modules/codemirror/mode/css/css.js',
        './node_modules/codemirror/mode/xml/xml.js',
        './node_modules/codemirror/mode/javascript/javascript.js',
        './node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
        './node_modules/codemirror/mode/sass/sass.js',
        './node_modules/codemirror/addon/display/autorefresh.js',
        './node_modules/angular-ui-codemirror/src/ui-codemirror.js',

        './node_modules/showdown/dist/showdown.min.js',
        './node_modules/showdown/dist/showdown.min.js.map',
        './node_modules/ng-showdown/dist/ng-showdown.min.js',
        './node_modules/ng-showdown/dist/ng-showdown.min.js.map',

        // './node_modules/restangular/node_modules/lodash/lodash.min.js',
        './node_modules/lodash/lodash.min.js',
        './node_modules/restangular/dist/restangular.js',

        './node_modules/angular-typescript/lib/at-angular.js',
        './node_modules/angular-typescript/lib/at-angular-resource.js',
        './node_modules/angular-typescript/lib/at-angular.js.map',
        './node_modules/angular-typescript/lib/at-angular-resource.js.map',

        './node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js',
        './node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js.map',
        './node_modules/angular-translate/dist/angular-translate.min.js',
        './node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        './node_modules/angular-translate/dist/angular-translate-storage-local/angular-translate-storage-local.min.js',
        './node_modules/angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        './node_modules/angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
        './node_modules/angular-translate/dist/angular-translate-handler-log/angular-translate-handler-log.min.js',
        //'./node_modules/messageformat/lib/messageformat.js',
        //'./node_modules/messageformat/lib/messageformat-parser.js',
        './node_modules/messageformat/messageformat.js',
        './node_modules/messageformat/locale/en.js',
        './node_modules/messageformat/locale/it.js',
        './node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min.js',

        './node_modules/moment/min/moment-with-locales.min.js',
        './node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
        './node_modules/angular-moment/angular-moment.min.js',
        './node_modules/angular-moment/angular-moment.min.js.map'
      ],
      css: [
        './node_modules/angular-material/angular-material.css',
        './node_modules/nvd3/build/nv.d3.css',
        './node_modules/codemirror/lib/codemirror.css',
        './node_modules/codemirror/theme/material.css'
      ],
      locale: [
        './node_modules/angular-i18n/angular-locale_it.js',
        './node_modules/angular-i18n/angular-locale_en.js'
      ]
    },
    scss: ['./{app,components}/**/*.scss', '!' + './app/index.scss', '!' + './app/vendor.scss'],
    blankTemplates: {
      all: join(generator, '**/*.**'),
      mod: [join(generator, 'temp.{t,scs}s'), join(generator, 'temp.module*.ts')],
      controller: [join(generator, 'temp.controller*.ts')],
      filter: [join(generator, 'temp.filter*.ts')],
      service: [join(generator, 'temp.service*.ts')],
      serviceClient: [join(generator, 'temp-client.service*.ts')],
      provider: [join(generator, 'temp.provider*.ts')],
      directive: [join(generator, 'temp.directive*.{ts,html}')],
      component: [join(generator, 'temp.component*.{ts,html}')]
    },
    html: {
      all: ['./app/**/*.html'],
      directive: ['./app/components/**/*.{directive,component,tpl}.html']
    }
  }
};
