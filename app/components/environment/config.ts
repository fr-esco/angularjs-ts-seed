'use strict';

export default angular.module('app.components.environment', [])

.constant('endpoint', {
  'apiBase': 'https://localhost/dev'
})

.constant('version', '1.11.0')

.name;
