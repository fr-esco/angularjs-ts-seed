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
      dev: 'dist/pkg/dev',
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

      ],
      css: [
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
