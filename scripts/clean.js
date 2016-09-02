#! /usr/bin/env node

'use strict'

require('shelljs/global')

const PATH = require('./PATH');
const utils = require('./utils');

const chalk = require('chalk')
const yargs = require('yargs')

const argv = yargs.reset()
  .usage('Usage: npm run clean -- [--env <dev | prod>] [--platform <browser | desktop | mobile>] [--target <all | lib>]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('t', 'target')
  .choices('t', ['all', 'lib'])
  .describe('t', 'Task name')

  .alias('p', 'platform')
  .choices('p', ['browser', 'desktop', 'mobile'])
  .describe('p', 'Target platform')

  .alias('s', 'support')
  .help('s')
  .argv

const log = utils.console('[' + chalk.cyan('clean') + ']')

const del = require('del')

const env = argv.env || process.env.NODE_ENV || 'dev'
const target = argv.target || process.env.NODE_TARGET || 'all'
const platform = argv.platform || process.env.NODE_PLATFORM || 'browser'

const key = { browser: target, desktop: 'pkg', mobile: 'www' }[platform]
const folder = PATH.dst[env][key]

if (test('-e', folder)) {
  if (!test('-d', folder))
    log.warn(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOTDIR], chalk.cyan(folder))
  del(folder).then(() => log.verbose('%s successfully deleted', chalk.cyan(folder)))
} else {
  log.error(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOENT], chalk.cyan(folder))
}
