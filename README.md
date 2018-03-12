# generator-one-base [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A tool to generate app structure and configuration for One Design Company projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator][yeoman-url] to aid in setting up commonly-used dependencies and application structure for One Design Company projects.

## Generators

There are many types of generators which can reference other generators. For example, a `craft` generator may compose a Craft project with `eslint`, `husky`, `style`, `scripts`, `gulp`, and `router`.

### Platforms

- `one-base:craft` - generates a basic Craft 2 or Craft 3 app
- `one-base:static` - generates a simple front end app with no back end
- `one-base:rails` - generates a Ruby on Rails app

### Front End

- `one-base:style` - installs common ODC style modules and dependencies and sets up a main.css
- `one-base:scripts` - creates the ODC javascripts structure and sets up an example main.js
- `one-base:router` - installs the one-router and sets up example templates
- `one-base:gulp` - installs a gulp build configuration
- `one-base:blendid` - installs a blendid build configuration

### Development Tools

- `one-base:git` - initializes a git repo and installs hooks and Github templates
- `one-base:husky` - installs the javascript/JSON prettifier and ODC husky config
- `one-base:eslint` - installs the ODC rules and rc files for auto-linting javascript
- `one-base:rubocop` - installs the ODC rules for Ruby projects


## Installation

### Dependencies
- [node.js][node-url] v6.11.1+
- [npm][npm-url] v3.10.3+

First, install [Yeoman][yeoman-url]:

```bash
npm install -g yo
```

Next, clone this repo and link it with npm:

```bash
git clone git@github.com:onedesign/generator-one-base.git
cd generator-one-base/
npm link
```

Finally, generate your new project:

```bash
yo one-base:craft
```

## License

MIT © [One Design Company](https://onedesigncompany.com)


[npm-image]: https://badge.fury.io/js/generator-one-base.svg
[npm-url]: https://npmjs.org/package/generator-one-base
[travis-image]: https://travis-ci.org/onedesign/generator-one-base.svg?branch=master
[travis-url]: https://travis-ci.org/onedesign/generator-one-base
[daviddm-image]: https://david-dm.org/onedesign/generator-one-base.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/onedesign/generator-one-base
[yeoman-url]: http://yeoman.io/authoring
[npm-url]: https://www.npmjs.com/
[node-url]: https://nodejs.org/
