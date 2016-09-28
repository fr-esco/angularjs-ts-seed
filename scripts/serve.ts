#! /usr/bin/env node

import * as path from 'path'
import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

import buildBrowser from './build-browser'

import * as yargs from 'yargs'

'use strict'

const chalk = require('chalk')
const pkg = require('../package.json')

const argv = yargs.reset()
  .usage('Usage: npm run serve -- ' +
  '[--env <dev | prod>] [--platform <browser | desktop | mobile>] [--watch] [--only] [--port=8080] [--device <browser | emulator | physical>]')

  .alias('d', 'device')
  .choices('d', ['browser', 'emulator', 'physical'])
  .default('d', 'browser')
  .describe('d', 'Target Device (mobile only)')

  .alias('e', 'env')
  .choices('e', ['dev', 'prod'])
  .describe('e', 'Target environment')

  .alias('p', 'platform')
  .choices('p', ['browser', 'win32', 'win64', 'macosx', 'android', 'ios'])
  .describe('p', 'Target platform')

  .alias('w', 'watch')
  .boolean('w')
  .default('w', false)
  .describe('w', 'Watch source files for automatic rebuilding')

  .alias('o', 'only')
  .boolean('o')
  .default('o', false)
  .describe('o', 'Serve without rebuilding')

  .option('port', {
    alias: 'port',
    default: 8080,
    describe: 'Server Port (mobile only)',
    type: 'number'
  })

  .alias('s', 'support')
  .help('s')
  .argv

const log = utils.console('[' + chalk.cyan('build') + ']')

const env = argv.env || process.env.NODE_ENV || 'dev'
const platform = argv.platform || process.env.NODE_PLATFORM || 'browser'

const runAll = require('npm-run-all')
const spawn = require('child_process').spawn
const open = require('open')

switch (platform) {
  case 'browser':
    buildBrowser(env, argv, false).then(serveBrowser).then(() => open('http://localhost:8080'))
    break
  case 'android':
  case 'ios':
    // https://github.com/apache/cordova-lib/tree/rel/6.2.0/cordova-lib/src/cordova
    argv.only ? serveCordova() : runAll([`clean -- --env=${env} --platform=${platform}`, `build -- --env=${env} --platform=browser --watch=${argv.watch}`], {
      parallel: false,
      stderr: process.stderr,
      stdout: process.stdout
    }).then(serveCordova).then(() => {
      if (argv.device === 'browser')
        open(`http://localhost:${argv.port}`)
    }).catch(err => {
      log.error(`serve ${platform} error`, err)
    })
    break
  case 'win32':
  case 'win64':
  case 'macosx':
    argv.only ? serveElectron() : runAll([`clean -- --env=${env} --platform=${platform}`, `build -- --env=${env} --platform=browser --watch=${argv.watch}`], {
      parallel: false,
      stderr: process.stderr,
      stdout: process.stdout
    }).then(serveElectron).catch(err => {
      log.error(`serve ${platform} error`, err)
    })
    break
}

function serveBrowser(code) {
  if (code) return
  // shell.sed('-i', ':8080', ':' + argv.port, [dst, 'index.html'].join('/'))
  const webpackOptions = ['--profile', '--progress', '--config', `webpack.config.${env}`, '--watch-poll', '--inline', '--hot'/*, '--port', argv.port*/]
  if (env === 'prod') webpackOptions.push('-p')
  return spawn(`webpack-dev-server`, webpackOptions, { stdio: 'inherit', shell: true })
    .on('close', (code) => {
      log.info(`webpack serve exited with code ${code}`)
    })
}

function serveCordova(results = []) {
  const code = results.reduce((code, result) => (code += result.code), 0)
  if (code === 0) {
    const src = PATH.dst[env].all
    const dst = PATH.dst[env].www
    shell.cp('-R', src + '/*', dst)
    shell.cd('cordova')

    let x
    const opts = []
    if (argv.only) opts.push('--nobuild')
    switch (argv.device) {
      case 'browser':
        shell.sed('-i', ':8080', ':' + argv.port, ['..', dst, 'index.html'].join('/'))
        x = spawn(`cordova prepare ${platform} && cordova serve ${argv.port}`, opts, { stdio: 'inherit', shell: true })
        break
      case 'emulator':
        shell.sed('-i', 'http://localhost:8080', '.', ['..', dst, 'index.html'].join('/'))
        opts.push('--emulator')
        x = spawn(`cordova run ${platform}`, opts, { stdio: 'inherit', shell: true })
        break
      case 'physical':
        shell.sed('-i', 'http://localhost:8080', '.', ['..', dst, 'index.html'].join('/'))
        opts.push('--device')
        x = spawn(`cordova run ${platform}`, opts, { stdio: 'inherit', shell: true })
        break
    }
    x.on('close', (code) => {
      if (code === 0) {
        log.info(`cordova serve exited with code ${code}`)
      } else
        log.error(`cordova serve exited with code ${code}`)
    })
  } else {
    log.error(`serve ${platform} error`, code)
  }
}

function serveElectron(results = []) {
  const code = results.reduce((code, result) => (code += result.code), 0)
  if (code === 0) {
    serveBrowser(0)

    const electron = require('electron-connect').server.create()

    return electron.start()
  } else {
    log.error(`serve ${platform} error`, code)
  }
}
