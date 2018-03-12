'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:craft-3', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/craft3'));
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
