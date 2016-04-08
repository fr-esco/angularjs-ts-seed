# REST (REpresentational State Transfer)

Guide for integrating REST (Level 2) services into your SPA (Single Page Application).

## Technology Stack

* AngularJS **1.5.x**
* Angular Component Router ([doc](https://docs.angularjs.org/guide/component-router))
* Restangular ([doc](https://github.com/mgonto/restangular))

### Mock

* Backend REST API Mock
  * json-mock ([doc](https://github.com/therebelbeta/json-mock))
  * faker ([doc](https://github.com/marak/Faker.js))

## Installation

```bash
npm install
```

## Get Started

In order to access any available Resource, you need to know its API endpoint.
Then, you can configure the Base API URL of all services by the following:

```js
// app/components/rest/rest.config.ts

let config = (restangularProvider: restangular.IProvider) => {
  restangularProvider.setBaseUrl('<protocol>://<host>:<port>/');
};
```

