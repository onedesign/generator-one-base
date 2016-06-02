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
    default: 'my-project'
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
        name: 'sass-mq',
        value: 'sass-mq',
        checked: true
      },
      {
        name: 'susy',
        value: 'susy',
        checked: true
      }
    ]
  }
]