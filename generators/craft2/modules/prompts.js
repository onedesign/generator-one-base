const _kebab = require('lodash/kebabCase');
const _isEmpty = require('lodash/isEmpty');
const plugins = require('./available-plugins');

const pluginChoices = [];

for (const key in plugins) {
  const plugin = plugins[key];
  pluginChoices.push({
    name: plugin.name,
    value: key,
    checked: plugin.checked
  });
}

module.exports = [
  //
  //   Craft License
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'acceptCraftLicense',
    message: 'Do you accept the Craft license? (https://craftcms.com/license)',
    default: true,
    store: true
  },

  //
  //   Project
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the title of this project?',
    validate: value => {
      return _isEmpty(value) ? 'Please enter a project title.' : true;
    }
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of this project (used as repo name)?',
    validate: value => {
      return _isEmpty(value) ? 'Please enter a project name.' : true;
    },
    default(answers) {
      return _kebab(answers.projectTitle);
    }
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'What is a 1 sentence description of this project?',
    validate: value => {
      return _isEmpty(value) ? 'Please enter a project description.' : true;
    }
  },

  //
  //   Optional Craft Plugins
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'checkbox',
    name: 'craftPlugins',
    message: 'Which optional plugins do you want installed?',
    choices: pluginChoices
  }
];
