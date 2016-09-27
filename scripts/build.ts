#! /usr/bin/env node

import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

import * as yargs from 'yargs'

'use strict'

const chalk = require('chalk')

const argv = yargs.reset()
  .usage('Usage: npm run build -- [--env <dev | prod>] [--platform <browser | desktop | mobile>] [--watch]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('p', 'platform')
  .choices('p', ['browser', 'desktop', 'mobile'])
  .describe('p', 'Target platform')

  .alias('w', 'watch')
  .boolean('w')
  .default('w', false)
  .describe('w', 'Watch source files for automatic rebuilding')

  .alias('s', 'support')
  .help('s')
  .argv

const log = utils.console('[' + chalk.cyan('build') + ']')

const env = argv.env || process.env.NODE_ENV || 'dev'
const platform = argv.platform || process.env.NODE_PLATFORM || 'browser'

const spawn = require('child_process').spawn
const gulp = spawn(`gulp webpack.build.${env}`, ['--env', env], { stdio: 'inherit', shell: true })

// ls.stdout.on('data', (data) => {
//   log.debug(`stdout: ${data}`)
// })

// ls.stderr.on('data', (data) => {
//   log.error(`stderr: ${data}`)
// })

gulp.on('close', (code) => {
  if (code === 0) {
    log.info(`gulp build exited with code ${code}`)
    const webpackOptions = ['--profile', '--progress', '--config', `webpack.config.${env}`]
    if (argv.watch) webpackOptions.push('--watch')
    const webpack = spawn(`webpack`, webpackOptions, { stdio: 'inherit', shell: true })
      .on('close', (code) => {
        log.info(`webpack build exited with code ${code}`)
      })
  } else
    log.error(`gulp build exited with code ${code}`)
})
