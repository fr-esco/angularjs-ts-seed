#! /usr/bin/env node

'use strict'

require('shelljs/global')

const PATH = require('./PATH');
const utils = require('./utils');

const chalk = require('chalk')
const yargs = require('yargs')

const argv = yargs.reset()
  .usage('Usage: npm run seed -- [-t <build | emulate | run>] -p <android | browser | ...> [-e <dev | prod>]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .default('e', 'dev')
  .describe('e', 'Target environment')

  .alias('t', 'task')
  .choices('t', ['build', 'emulate', 'run'])
  .default('t', 'run')
  .describe('t', 'Task name')

  .alias('p', 'platform')
  .default('p', 'browser')
  .choices('p', ['mobile', 'browser', 'desktop'])
  .describe('p', 'Target platform')

  .alias('s', 'support')
  .help('s')
  .argv

echo(argv)

// CLEAN

const del = require('del')

const env = process.env.NODE_ENV || argv.env
const target = process.env.NODE_TARGET || argv.target || 'lib'
const console = utils.console('[' + chalk.cyan('clean') + ']')

const folder = PATH.dst[env][target]
if (test('-e', folder)) {
  if (!test('-d', folder))
    console.warn(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOTDIR], chalk.cyan(folder))
  del(folder).then(() => console.debug(chalk.cyan(folder), 'successfully deleted'))
} else {
  console.error(utils.ERRNO_MESSAGES[utils.ERRNO_CODES.ENOENT], chalk.cyan(folder))
}
