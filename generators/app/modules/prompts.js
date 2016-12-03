function notBlank(input) {
  if (input.length) {
    return true;
  }
  return "Please enter a description.";
}

// https://gist.github.com/mathewbyrne/1280286
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

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
  },

  //
  //   Craft
  //
  //////////////////////////////////////////////////////////////////////
  {
    type: 'confirm',
    name: 'isCraft',
    message: 'Will this project use Craft CMS?',
    default: true,
    store: true
  }
]
