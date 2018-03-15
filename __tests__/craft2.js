'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const plugins = require('../generators/craft2/modules/available-plugins');

describe('generator-one-base:craft-2', () => {
  describe('default', () => {
    const promptAnswers = {
      projectTitle: 'Craft2 Project',
      projectName: 'craft2-project',
      projectDescription: 'Craft2 project description',
      craftPlugins: [
        'assetrev',
        'minify', // composer plugin
        'imager' // Github downloaded plugin
      ]
    };

    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/craft2'))
        .withPrompts(promptAnswers);
    });

    it('downloads craft', () => {
      assert.file([
        'craft/app/Craft.php',
        'craft/app/index.php'
      ]);
    });

    it('configures Craft', () => {
      assert.fileContent('craft/config/general.php', "getenv('APP_SITE_URL')");
      assert.fileContent('craft/config/db.php', "getenv('APP_DB_SERVER')");
    });

    it('installs plugins with composer', () => {
      assert.fileContent('composer.json', `"${plugins.minify.src}":`);
    });

    it('adds a sample .env file', () => {
      assert.fileContent('env.sample', 'APP_SITE_URL=');
    });

    it('installs plugins by downloading from Github', () => {
      assert.file('craft/plugins/imager/ImagerPlugin.php');
    });

    it('adds imager config for imager plugin', () => {
      assert.file('craft/config/imager.php');
    });

    it('adds asset rev config for assetrev plugin', () => {
      assert.file('craft/config/assetrev.php');
      assert.fileContent('env.sample', 'IMAGER_SYSTEM_PATH=');
    });

    it('adds .gitignore', () => {
      assert.fileContent('.gitignore', '# Craft 2');
    });

    it('adds a README.md', () => {
      assert.fileContent('README.md', `# ${promptAnswers.projectTitle}`);
    });

    it('writes a package.json with project details', () => {
      assert.fileContent('package.json', `"name": "${promptAnswers.projectName}",`);
      assert.fileContent('package.json', `"description": "${promptAnswers.projectDescription}",`);
    });

    it('does not leave the downloads directory around', () => {
      assert.noFile('craft/plugins/downloads/');
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

    it('generates with git generator', () => {
      assert.file('.git');
    });
  });
});
