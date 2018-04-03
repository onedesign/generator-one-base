'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:gulp', () => {
  describe('default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          skipInstall: false,
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useNunjucks: false
        });
    });

    it('creates files', () => {
      assert.file([
        'gulpfile.js',
        '.stylelintrc',
        'gulp/tasks',
        'gulp/tasks/base.js',
        'gulp/tasks/build.js'
      ]);
    });

    it('doesn\'t create index.html', () => {
      assert.noFile('src/templates/index.twig');
    });

    it('adds .gitgnore rules', () => {
      assert.fileContent('.gitignore', '/dist');
    });

    it('adds dependencies', () => {
      assert.fileContent('package.json', 'gulp');
      assert.fileContent('package.json', 'dotenv');
      assert.fileContent('package.json', 'run-sequence');
    });

    it("doesn't create nunjucks build files", () => {
      assert.noFile([
        'gulp/tasks/nunjucks.js'
      ]);
      assert.noFileContent('gulp/tasks/base.js', "'nunjucks',");
      assert.noFileContent('gulp/tasks/watch.js', "runSequence('nunjucks')");
    });

    it("doesn't add nunjucks as a dep", () => {
      assert.noFileContent('package.json', 'gulp-nunjucks-render');
    });
  });

  describe('with nunjucks enabled', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/gulp'))
        .withOptions({
          skipInstall: false,
          rootDistPath: 'dist',
          templateSrc: 'src/templates/',
          templateDist: 'dist/',
          serverBaseDir: 'dist/',
          useProxy: false,
          useNunjucks: true
        });
    });

    it('creates nunjucks build files', () => {
      assert.file([
        'gulp/tasks/nunjucks.js'
      ]);
      assert.fileContent('gulp/tasks/base.js', "'nunjucks',");
      assert.fileContent('gulp/tasks/watch.js', "runSequence('nunjucks')");
    });

    it('creates nunjucks templates', () => {
      assert.file('src/templates/index.twig');
      assert.file('src/templates/_layout.twig');
    });

    it('adds nunjucks as a dep', () => {
      assert.fileContent('package.json', 'gulp-nunjucks-render');
    });
  });
});
