'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const prompts = {
  title: 'Test Project',
  name: 'test-project',
  description: 'This is just for tests',
  authorName: 'Testing Testorson',
  authorEmail: 'test@example.com',
  authorUrl: 'https://example.com'
};

describe('generator-one-base:app', () => {
  describe('defaults', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts(prompts);
    });

    it('creates files', () => {
      assert.file([
        'package.json',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        'env.sample',
        '.env'
      ]);
    });

    it('popuplates the package.json with the correct data.', () => {
      assert.JSONFileContent('package.json', {
        name: prompts.name,
        description: prompts.description,
        author: {
          name: prompts.authorName,
          email: prompts.authorEmail,
          url: prompts.authorUrl
        }
      });
    });

    it('populates the env files with data.', () => {
      assert.fileContent('.env', `http://${prompts.name}.test`);
      assert.fileContent('env.sample', `http://${prompts.name}.test`);
    });

    it('populates the README with data', () => {
      assert.fileContent('README.md', `# ${prompts.title}`);
      assert.fileContent('README.md', `${prompts.description}`);
    });
  });

  describe('odc option', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withOptions({ odc: true })
        .withPrompts(prompts);
    });

    it('populates the package.json with default data', () => {
      assert.JSONFileContent('package.json', {
        author: {
          name: 'One Design Company',
          email: 'dev@onedesigncompany',
          url: 'https://onedesigncompany.com'
        }
      });
    });
  });

  describe('blendid', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts(Object.assign({}, prompts, {
          buildProcess: 'blendid'
        }));
    });

    it('fills in the package.json with correct data.', () => {
      assert.JSONFileContent('package.json', {
        scripts: {
          start: 'blendid',
          build: 'NODE_ENV=production blendid build'
        },
        dependencies: [
          'blendid',
          'dotenv'
        ]
      });
    });
  });
});
