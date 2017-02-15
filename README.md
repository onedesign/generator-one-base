# generator-one-base

A foundation for One Design Company projects on the web.

## Features

- [Gulp](http://gulpjs.com)-based build process that handles style, javascript, and image compilation and optimization with lots of nice features baked right in.
- SCSS-based style structure with all of the base styles and tools you need to hit the ground running.
- Modular Javascript setup powered by [Webpack](https://webpack.github.io) and support for next-generation syntax via [Babel](https://babeljs.io)
- Installs latest versions of all development tools and optional frontend libraries via [npm](https://www.npmjs.com)
- Development server with live reload, powered by [BrowserSync](https://www.browsersync.io) that can optionally proxy an existing URL.
- Pull Request template for consistent pull requests
- Pre-commit hook that checks for commonly used logging functions and doesn't allow you to commit when they are present.

## Installation

### Prerequisites

- [node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/en/docs/install)
- [yo](https://www.npmjs.com/package/yo)

### via npm link…

You can clone this repo and use `npm link` to use the cloned repo as your global version of `generator-one-base`

```bash
git clone git@github.com:onedesign/generator-one-base.git
cd generator-one-base
npm link
```

## Use

Generate your new project:

```bash
yo one-base
```
