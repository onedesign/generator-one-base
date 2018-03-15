const _isEmpty = require('lodash/isEmpty');
const _kebab = require('lodash/kebabCase');

module.exports = [
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
  //   Nunjucks for templating?
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'useNunjucks',
    message: 'Add support for nunjucks template engine?',
    default: false
  }
];
