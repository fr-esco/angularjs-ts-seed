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
      report: 'test/report'
    },
    prod: {
      all: 'dist/prod',
      lib: 'dist/prod/lib'
    },
    pkg: {
      prod: 'dist/pkg/prod'
    }
  },
  src: {
    app: {
      all: ['./app/**/*.ts'],
      dev: ['./app/**/*.ts', '!./app/**/*.spec.ts'],
      test: ['./app/**/*.ts', '!./app/init.ts']
    },
    // Order is quite important here for the HTML tag injection.
    lib: {
      js: [
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
        './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/angular/angular.js',
        './node_modules/@angular/router/angular1/angular_1_router.js',
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

        './node_modules/angular-typescript/lib/at-angular.js',
        './node_modules/angular-typescript/lib/at-angular-resource.js',
        './node_modules/angular-typescript/lib/at-angular.js.map',
        './node_modules/angular-typescript/lib/at-angular-resource.js.map'
      ],
      css: [
        './node_modules/angular-material/angular-material.css',
        './node_modules/nvd3/build/nv.d3.css',
        './node_modules/codemirror/lib/codemirror.css',
        './node_modules/codemirror/theme/material.css'
      ]
    },
    scss: ['./{app,components}/**/*.scss', '!' + './app/index.scss', '!' + './app/vendor.scss'],
    blankTemplates: {
      all: join(generator, '**/*.**'),
      mod: [join(generator, 'temp.ts'), join(generator, 'temp.module*.ts')],
      controller: [join(generator, 'temp.controller*.ts')],
      filter: [join(generator, 'temp.filter*.ts')],
      service: [join(generator, 'temp.service*.ts')],
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
