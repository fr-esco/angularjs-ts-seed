'use strict'

export default angular.module('<%- moduleName %>'<% if (deps) { %>, <%= JSON.stringify(deps) %><% } %>)
<% constants.forEach(function (constant) { %>
.constant('<%- constant.name %>', <%= constant.value %>)
<% }) %>
.name
