#! /usr/bin/env node

import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

import * as yargs from 'yargs'

'use strict'

const argv = yargs.reset()
  .usage('Usage: npm run clean -- [--env <dev | prod>] [--platform <browser | desktop | mobile>] [--target <all | lib>]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('t', 'target')
  .choices('t', ['all', 'lib'])
  .describe('t', 'Target Name')

  .alias('p', 'platform')
  .choices('p', ['browser', 'desktop', 'win32', 'win64', 'macosx', 'android', 'ios'])
  .describe('p', 'Target platform')

  .alias('s', 'support')
  .help('s')
  .argv

const chalk = require('chalk')
const del = require('del')
const log = utils.console('[' + chalk.cyan('clean') + ']')

const env = argv.env || process.env.NODE_ENV || 'dev'
const target = argv.target || process.env.NODE_TARGET || 'all'
const platform = argv.platform || process.env.NODE_PLATFORM || 'browser'

const key = {
  browser: target,
  desktop: 'pkg', win32: 'pkg', win64: 'pkg', macosx: 'pkg',
  mobile: 'www', android: 'www', ios: 'www'
}[platform]
let folder = PATH.dst[env][key]

if (shell.test('-e', folder)) {
  if (!shell.test('-d', folder))
    log.warn(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOTDIR], chalk.cyan(folder))
  if (key === 'www') folder += '/*'
  del(folder).then(() => log.verbose(chalk.cyan(folder), 'successfully deleted'))
} else {
  log.error(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOENT], chalk.cyan(folder))
}

const spawn = require('child_process').spawn

switch (platform) {
  case 'browser':
    break
  case 'android':
  case 'ios':
  case 'mobile':
    spawn(`cd cordova && cordova clean ${platform} && cd ..`, [], { stdio: 'inherit', shell: true })
      .on('close', (code) => {
        if (code === 0) {
          log.info(`cordova clean exited with code ${code}`)
        } else
          log.error(`cordova clean exited with code ${code}`)
      })
    break
  case 'desktop':
    break
}
