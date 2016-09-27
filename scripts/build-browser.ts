#! /usr/bin/env node

import * as shell from 'shelljs'

import PATH from './PATH'
import utils from './utils'

'use strict'

const runAll = require('npm-run-all')
const spawn = require('child_process').spawn

const platform = 'browser'

const log = utils.console('[' + require('chalk').cyan(`build:${platform}`) + ']')

export default function buildBrowser(env: string, argv: any, webpack = true): Promise<number> {
  return runAll([`clean -- --env=${env} --platform=${platform}`, `lint`], {
    parallel: true,
    stderr: process.stderr,
    stdout: process.stdout
  }).then(results => {
    return new Promise((resolve, reject) => {
      const code = results.reduce((code, result) => (code += result.code), 0)
      if (code === 0) {
        spawn(`gulp webpack.build.${env}`, ['--env', env], { stdio: 'inherit', shell: true })
          .on('close', (code) => {
            if (code === 0) {
              log.info(`gulp build exited with code ${code}`)
              if (webpack) {
                const webpackOptions = ['--profile', '--progress', '--config', `webpack.config.${env}`]
                if (argv.watch) webpackOptions.push('--watch')
                spawn(`webpack`, webpackOptions, { stdio: 'inherit', shell: true })
                  .on('close', (code) => {
                    log.info(`webpack build exited with code ${code}`)
                    if (code === 0)
                      resolve(code)
                    else
                      reject(code)
                  })
              } else {
                resolve(code)
              }
            } else {
              log.error(`gulp build exited with code ${code}`)
              reject(code)
            }
          })
      } else {
        log.error(`build ${platform} error`, code)
        reject(code)
      }
    })
  }).catch(err => {
    log.error(`build ${platform} error`, err)
    return -1
  })
}
