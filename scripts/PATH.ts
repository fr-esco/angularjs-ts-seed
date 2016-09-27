/// <reference path="../typings/index.d.ts" />

import {join} from 'path'

'use strict'

const dst = {
  all: 'dist',
  dev: {
    all: 'dist/dev',
    lib: 'dist/dev/lib',
    pkg: 'dist/pkg/dev',
    www: 'cordova/www'
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
    lib: 'dist/prod/lib',
    pkg: 'dist/pkg/prod',
    www: 'cordova/www'
  },
  server: {
    host: 'http://localhost',
    port: 5555
  }
}

const src = {

}

export default {
  dst: dst,
  src: src
}
