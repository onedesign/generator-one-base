const _kebab = require('lodash/kebabCase');
const _isEmpty = require('lodash/isEmpty');

module.exports = {
  base: [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of this project?',
      validate(value) {
        return _isEmpty(value) ? 'Please enter a project title.' : true;
      }
    },
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
      message: 'What is a brief description of this project?',
      validate: value => {
        return _isEmpty(value) ? 'Please enter a project description.' : true;
      }
    }
  ],
  author: [
    {
      type: 'input',
      name: 'authorName',
      message: "What's your name?"
    },
    {
      type: 'input',
      name: 'authorEmail',
      message: "What's your email address?"
    },
    {
      type: 'input',
      name: 'authorUrl',
      message: "What's your website?"
    }
  ]
};
