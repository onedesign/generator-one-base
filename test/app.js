'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-one-base:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ 
        projectTitle: 'My Project',
        projectName: 'my-project',
        name: 'Chris Malven',
        email: 'chris@domain.com',
        website: 'http://www.google.com',
        githubName: 'cmalven',
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js',
      '.gitignore',
      'index.html',
      'package.json',
      'gulp',
      'src/scripts',
      'src/styles'
    ]);
  });

  it('uses project title in index.html', function () {
    assert.fileContent('index.html', /<title>My Project<\/title>/);
  });

  it('uses project details in package.json', function () {
    assert.fileContent('package.json', /"name": "my-project"/);
    assert.fileContent('package.json', /"title": "My Project"/);
    assert.fileContent('package.json', /"url": "https:\/\/github.com\/cmalven\/my-project"/);
    assert.fileContent('package.json', /"name": "Chris Malven"/);
    assert.fileContent('package.json', /"email": "chris@domain.com"/);
    assert.fileContent('package.json', /"url": "http:\/\/www.google.com"/);
  });
});
