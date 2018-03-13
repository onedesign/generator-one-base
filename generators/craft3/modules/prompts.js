const plugins = require('./available-plugins');
const _kebab = require('lodash/kebabCase');
const _isEmpty = require('lodash/isEmpty');

const pluginChoices = plugins.map(function(plugin) {
  return {
    name: plugin.name,
    value: plugin.src,
    checked: plugin.checked
  };
});

module.exports = [
  //
  //   Project
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of this project?',
    validate: value => {
      return _isEmpty(value) ? 'Please enter a project name.' : true;
    },
    default(answers) {
      return _kebab(answers.title);
    }
  },
  {
    type: 'input',
    name: 'description',
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
