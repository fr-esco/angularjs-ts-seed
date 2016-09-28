'use strict';

const PATH = require('./PATH');

const gulp = require('gulp');
const gutil = require('gulp-util');

const fs = require('fs');
const join = require('path').join;

function lintDts() {
  const ko = checkFolders(PATH.src.app.root);
  if (ko.length > 0) {
    throw new gutil.PluginError({
      plugin: 'lint.dts',
      message: ['The following files and folders have non-compliant names:',
        gutil.colors.red(ko.join(', '))].join('\n\t')
    });
  } else {
    this.emit('end');
  }
}

lintDts.description = 'Ensure Directory Tree Structure (DTS) standards are applied';

gulp.task('lint.dts', lintDts);

function lint() { }

lint.description = 'Ensure coding standards and best practices are applied using linters';

gulp.task('lint', ['lint.dts'], lint);

function checkFolders(root) {
  const ko = [];
  checkFolder(root);
  return ko.filter(function (file) {
    return file[0] !== '_' && file.indexOf('MaterialIcons') < 0 && file.indexOf('i18n') < 0;
  });

  function checkFolder(dir) {
    fs.readdirSync(dir).forEach(function (file) {
      if (/[^\.a-z0-9-]/.test(file)) {
        ko.push(file);
      }
      if (fs.statSync(join(dir, file)).isDirectory()) {
        checkFolder(join(dir, file));
      }
    });
  }
}
