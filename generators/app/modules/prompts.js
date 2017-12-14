var notBlank = require('./notBlank');
var slugify = require('./slugify');

module.exports = [
  //
  //   package.json Details
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is your project’s title?',
    default: 'My Project'
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'What is your project’s name?',
    default: function(answers) {
      return slugify(answers.projectTitle);
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is a brief description of this project?',
    default: '',
    validate: notBlank
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    default: '',
    store: true
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
    default: '',
    store: true
  },
  {
    type: 'input',
    name: 'website',
    message: 'What is your website URL?',
    default: 'http://www.onedesigncompany.com',
    store: true
  },
  {
    type: 'input',
    name: 'githubName',
    message: 'What is your github username?',
    default: 'onedesign',
    store: true
  },

  //
  //   Optional Library Installs
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'checkbox',
    name: 'optionalDeps',
    message: 'Which optional dependencies do you want installed?',
    choices: [
      {
        name: 'lodash',
        value: 'lodash',
        checked: true
      },
      {
        name: 'jquery',
        value: 'jquery',
        checked: true
      },
      {
        name: 'one-router',
        value: 'one-router',
        checked: true
      },
      {
        name: 'sass-mq',
        value: 'sass-mq',
        checked: true
      },
      {
        name: 'susy',
        value: 'susy',
        checked: true
      },
      {
        name: 'one-sass-toolkit',
        value: 'one-sass-toolkit',
        checked: true
      }
    ]
  },

  //
  //   Git
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'gitInit',
    message: 'Initialize a git repo for this project?',
    default: true,
    store: true
  },

  //
  //   Platform
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'list',
    name: 'platform',
    message: 'What platform should the project use?',
    choices: [
      {
        name: 'Static',
        value: 'static'
      },
      {
        name: 'Craft 2',
        value: 'craft2'
      },
      {
        name: 'Craft 3',
        value: 'craft3'
      }
    ]
  }
]
