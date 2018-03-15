'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-one-base:static', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Craft2 Project',
      projectName: 'craft2-project',
      projectDescription: 'Craft2 project description',
      useNunjucks: true
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/static'))
        .withPrompts(promptAnswers);
    });

    it('Sets up git', () => {
      assert.file([
        '.gitignore',
        '.git/'
      ]);
    });

    it('adds a README.md', () => {
      assert.fileContent('README.md', `# ${promptAnswers.projectTitle}`);
    });

    it('writes a package.json with project details', () => {
      assert.fileContent('package.json', `"name": "${promptAnswers.projectName}",`);
      assert.fileContent('package.json', `"description": "${promptAnswers.projectDescription}",`);
    });

    it('generates with scripts generator', () => {
      assert.file('src/scripts/');
    });

    it('generates with styles generator', () => {
      assert.file('src/styles/');
    });

    it('generates with gulp generator', () => {
      assert.file(['gulpfile.js', 'gulp']);
    });
  });
});
