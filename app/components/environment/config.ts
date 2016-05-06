'use strict';

export default angular.module('app.components.environment', [])

.constant('endpoint', {
  'apiBase': 'http://localhost/dev',
  'configPoint': 'http://localhost:5555/configPoint',
  'permission': 'http://localhost:5555/permission'
})

.constant('version', '0.4.0')

.name;
