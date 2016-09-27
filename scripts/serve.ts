#! /usr/bin/env node

import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

import buildBrowser from './build-browser'

import * as yargs from 'yargs'

'use strict'

const chalk = require('chalk')
const pkg = require('../package.json')

const argv = yargs.reset()
  .usage('Usage: npm run build -- [--env <dev | prod>] [--platform <browser | desktop | mobile>] [--watch] [--only]')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('p', 'platform')
  .choices('p', ['browser', 'desktop', 'win32', 'win64', 'macosx', 'android', 'ios'])
  .describe('p', 'Target platform')

  .alias('w', 'watch')
  .boolean('w')
  .default('w', false)
  .describe('w', 'Watch source files for automatic rebuilding')

  .alias('o', 'only')
  .boolean('o')
  .default('o', false)
  .describe('o', 'Serve without rebuilding')

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
    buildBrowser(env, argv, false).then(code => {
      const webpackOptions = ['--profile', '--progress', '--config', `webpack.config.${env}`, '--watch-poll', '--inline', '--hot']
      if (env === 'prod') webpackOptions.push('-p')
      spawn(`webpack-dev-server`, webpackOptions, { stdio: 'inherit', shell: true })
        .on('close', (code) => {
          log.info(`webpack serve exited with code ${code}`)
        })
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
      log.error(`build ${platform} error`, err)
    })
    break
  case 'win32':
  case 'win64':
  case 'macosx':
  case 'desktop':
    const timestamp = (new Date()).toJSON().replace(/-/g, '').replace(/:/g, '').substring(0, 13)
    runAll([`clean -- --env=${env} --platform=${platform}`, `build -- --env=${env} --platform=browser --watch=${argv.watch}`], {
      parallel: false,
      stderr: process.stderr,
      stdout: process.stdout
    }).then(results => {
      const code = results.reduce((code, result) => (code += result.code), 0)
      if (code === 0) {
        const src = PATH.dst[env].all
        const dst = PATH.dst[env].all
        shell.cp('-R', ['package.json', 'electron.extra.*.js', 'electron.preload.js'], dst)
        shell.cp('electron.conf.package.js', [dst, pkg.main].join('/'))
        shell.sed('-i', 'http://localhost:8080', '.', [dst, 'index.html'].join('/'))
        spawn(`gulp electron`, ['--name', 'electron-' + timestamp, '--env', env, '--platform', platform], { stdio: 'inherit', shell: true })
          .on('close', (code) => {
            if (code === 0) {
              log.info(`electron build exited with code ${code}`)
            } else
              log.error(`electron build exited with code ${code}`)
          })
      } else {
        log.error(`build ${platform} error`, code)
      }
    }).catch(err => {
      log.error(`build ${platform} error`, err)
    })
    break
}
