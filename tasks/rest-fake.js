'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var gutil = require('gulp-util');

var faker = require('faker');
var fs = require('fs');
var join = require('path').join;

var db = join(PATH.dest.test.all, PATH.dest.test.rest.db);

gulp.task('rest.fake', function() {

  var data = {
    people: times(10).map(aPerson)
  };

  fs.writeFileSync(db, JSON.stringify(data, null, 2), 'utf-8');

});

function times(n, value) {
  value = value || {};

  var temp = [];

  for (var i = 0; i < n; i++)
    temp.push(value);

  return temp;
}

function aPerson() {
  return {
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email()
  };
}
