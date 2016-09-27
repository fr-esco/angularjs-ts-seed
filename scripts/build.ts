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
  .choices('p', ['browser', 'desktop', 'android', 'ios'])
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

const runAll = require('npm-run-all')
const spawn = require('child_process').spawn

switch (platform) {
  case 'browser':
    runAll([`clean -- --env=${env} --platform=${platform}`, `lint`], {
      parallel: true,
      stderr: process.stderr,
      stdout: process.stdout
    }).then(results => {
      const code = results.reduce((code, result) => (code += result.code), 0)
      if (code === 0) {
        spawn(`gulp webpack.build.${env}`, ['--env', env], { stdio: 'inherit', shell: true })
          .on('close', (code) => {
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
      } else {
        log.error(`build ${platform} error`, code)
      }
    }).catch(err => {
      log.error(`build ${platform} error`, err)
    })
    break
  case 'android':
  case 'ios':
  case 'mobile':
    runAll([`clean -- --env=${env} --platform=${platform}`, `build -- --env=${env} --platform=browser --watch=${argv.watch}`], {
      parallel: false,
      stderr: process.stderr,
      stdout: process.stdout
    }).then(results => {
      const code = results.reduce((code, result) => (code += result.code), 0)
      if (code === 0) {
        const src = PATH.dst[env].all
        const dst = PATH.dst[env].www
        shell.cp('-R', src, dst)
        spawn(`cd cordova && cordova build ${platform} && cd ..`, [], { stdio: 'inherit', shell: true })
          .on('close', (code) => {
            if (code === 0) {
              log.info(`cordova build exited with code ${code}`)
            } else
              log.error(`cordova build exited with code ${code}`)
          })
      } else {
        log.error(`build ${platform} error`, code)
      }
    }).catch(err => {
      log.error('build mobile error', err)
    })
    break
}
