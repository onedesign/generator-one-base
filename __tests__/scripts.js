'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:scripts', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/scripts'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file([
      'src/scripts/main.js',
      'src/scripts/modules'
    ]);
  });
});
