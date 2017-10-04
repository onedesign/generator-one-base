# <%= projectTitle %>

<%= description %>

## Setup
<% if (platform == 'craft') { %>
- Create a MySQL-compatible database called `<%= projectName %>`
- `composer install`<% } %>
- `cp env.sample .env` and modify the contents of `.env` to match your setup

### Front End Dependencies

First, make sure you have [NodeJS](http://nodejs.org), [Yarn](https://yarnpkg.com), and [Gulp](http://gulpjs.com) installed. Then:

* `yarn`
* `yarn start`

### Development Server

While `gulp` is running, you can access the site at [http://localhost:3000](http://localhost:3000)

## Deployment

Run `NODE_ENV=production yarn build` to build prepare all assets for deployment.
