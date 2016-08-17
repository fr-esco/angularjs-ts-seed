'use strict';

export default angular.module('app.components.environment', [])

.constant('endpoint', {
  'apiBase': 'https://localhost/dev'
})

.constant('version', '1.10.0')

.name;
