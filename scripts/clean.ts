#! /usr/bin/env node

import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

import * as yargs from 'yargs'

'use strict'

const chalk = require('chalk')
const del = require('del')

const argv = yargs.reset()
  .usage('Usage: npm run clean -- [--env <dev | prod>] [--platform <browser | desktop | mobile>] [--target <all | lib>]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('t', 'target')
  .choices('t', ['all', 'lib'])
  .describe('t', 'Target Name')

  .alias('p', 'platform')
  .choices('p', ['browser', 'desktop', 'mobile'])
  .describe('p', 'Target platform')

  .alias('s', 'support')
  .help('s')
  .argv

const log = utils.console('[' + chalk.cyan('clean') + ']')

const env = argv.env || process.env.NODE_ENV || 'dev'
const target = argv.target || process.env.NODE_TARGET || 'all'
const platform = argv.platform || process.env.NODE_PLATFORM || 'browser'

const key = { browser: target, desktop: 'pkg', mobile: 'www' }[platform]
const folder = PATH.dst[env][key]

if (shell.test('-e', folder)) {
  if (!shell.test('-d', folder))
    log.warn(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOTDIR], chalk.cyan(folder))
  del(folder).then(() => log.verbose(chalk.cyan(folder), 'successfully deleted'))
} else {
  log.error(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOENT], chalk.cyan(folder))
}
