const config = require("../config");
const gulp = require("gulp");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");

const hot = config.scripts.hot;
const compiler = webpack(webpackConfig);

//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreses browser on file changes and syncs scroll/clicks between devices.
Your site will be available at http://localhost:3000
*/
module.exports = gulp.task("browserSync", function() {
  const middleware = [
    require("webpack-dev-middleware")(compiler, {
      stats: "errors-only",
      publicPath: webpackConfig.output.publicPath
    })
  ];

  if (hot) {
    middleware.push(require("webpack-hot-middleware")(compiler));
  }

  const options = {
    open: false,
    middleware
  };

  if (config.useProxy) {
    options.proxy = config.proxyUrl;
  } else {
    options.server = {
      baseDir: config.serverBaseDir
    };
  }

  // Initialize Browsersync
  global.browserSync.init(options);
});
