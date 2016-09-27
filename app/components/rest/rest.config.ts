'use strict'

let config = (restangularProvider: restangular.IProvider) => {
  restangularProvider.setBaseUrl('http://localhost:3000/')
}

config.$inject = ['RestangularProvider']

export default config
