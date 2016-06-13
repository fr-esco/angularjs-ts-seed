'use strict';

const {shell} = require('electron');
const open = shell.openExternal;
const url = require('url');

const publicDomains = [];
const authDomains = [];

// https://nodejs.org/api/url.html
const sso = {
  protocol: 'https:',
  hostname: 'www.googlex.com',
  port: '8080',
  pathname: 'endpoint',
  query: { foo: bar },
  hash: ''
};

const isPublic = domain => publicDomains.indexOf(domain) > -1;
const isAuth = domain => authDomains.indexOf(domain) > -1;

const extractDomain = url => url.split('/')[url.indexOf('://') > -1 ? 2 : 0].split(':')[0];

function handleRedirect(e, toUrl) {
  console.log('PreNavigate', toUrl);
  e.preventDefault();

  let domain = extractDomain(toUrl);
  if (isPublic(domain)) {
    // Eventual Manipulation...
    toUrl = domain;
  } else if (isAuth(domain)) {
    // Eventual Manipulation...
    sso.query.returnUrl = domain;
    toUrl = url.format(sso);
  } else {
    console.warn('Invalid Domain: ' + domain);
    // throw RangeError('Invalid Domain: ' + domain);
  }

  open(toUrl);
}

module.exports = handleRedirect;
