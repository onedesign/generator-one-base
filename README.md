# generator-one-base [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A tool to generate app structure for One Design Company projects on the web.

## What is this?

This is a set of generators based on [yeoman-generator][yeoman-url] to aid in setting up commonly-used dependencies and application structure for One Design Company projects.

TThe generator is made up of a few sub generators
  - `app` — Generates the app structure for one of the following:
    - Craft 3
    - Craft 2
    - Static
  - `git` — Initializes a git repo and sets up hooks and templates
  - `styles` — Adds style dendencies like `suzy`, `one-sass-toolkit`, and other foundational styles

## Installation

### Dependencies
- [node.js][node-url] v6.11.1+
- [npm][npm-url] v3.10.3+

First, install [Yeoman][yeoman-url] and generator-one-base:

```bash
npm install -g yo
npm install -g generator-one-base
```

Then generate your new project:

```bash
yo one-base
```

## Creating a new generator

* `npm install -g generator-generator` installs the generator-generator
* `yo generator:subgenerator <name>` generates a subgenerator with the name `<name>`

[Read the generator-generator docs][yeoman-generator-docs] for details about using it.

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
[yeoman-generator-docs]: https://github.com/yeoman/generator-generator
