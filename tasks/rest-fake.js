'use strict';

var PATH = require('./PATH');

var gulp = require('gulp');
var gutil = require('gulp-util');

var faker = require('faker');
var fs = require('fs');
var join = require('path').join;

var db = join(PATH.dest.test.all, PATH.dest.test.rest.db);

gulp.task('rest.fake', function() {

  gutil.log(gutil.colors.blue('Generating data...'));
  var data = {
    people: times(10).map(aPerson),
    posts: times(10).map(aPost),
    tags: times(10).map(aTag),
    comments: []
  };
  data.posts.forEach(function(post) {
    data.comments = data.comments.concat(times(5).map(aComment(post)));
  });
  gutil.log(gutil.colors.blue('Data generated'));

  fs.writeFileSync(db, JSON.stringify(data, null, 2), 'utf-8');
  gutil.log(gutil.colors.green('Data saved in ' + db));
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
    id: faker.random.uuid(),
    first: faker.name.firstName(),
    last: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email()
  };
}
function aPost(old, index) {
  return {
    id: index,
    createdAt: faker.date.recent(),
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs()
  };
}
function aComment(post) {
  return function(old, index) {
    return {
      id: index,
      createdAt: faker.date.recent(),
      postId: post.id,
      content: faker.lorem.sentences()
    };
  };
}
function aTag() {
  return {
    id: faker.random.uuid(),
    createdAt: faker.date.recent(),
    name: faker.lorem.word()
  };
}
