const config = require("../config");
const gulp = require("gulp");
const _ = require("lodash");
const path = require("path");
const stripAnsi = require("strip-ansi");
const webpack = require("webpack");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const util = require("util");
const webpackConfig = require("../webpack.config");

//
//   Scripts : Bundle
//
//////////////////////////////////////////////////////////////////////

/*
Bundles javascript files.
*/

gulp.task("scripts:bundle", function(callback) {
  //---------------------------------------------------------------
  // Webpack
  //---------------------------------------------------------------
  webpack(webpackConfig, function(err, stats) {
    const log = function(stats) {
      util.log(
        "[webpack]",
        stats.toString({
          chunks: false,
          colors: true,
          version: false,
          hash: false,
          maxModules: 50,
          modulesSort: "!size"
        })
      );
    };

    if (err) throw new util.PluginError("webpack", err);

    if (stats.hasErrors()) {
      const info = stats.toJson("errors-only");
      const body = stripAnsi(info.errors.join("/n"));
      global.browserSync.notify(body, 30000);
    } else {
      global.browserSync.reload({ once: true });
    }
    log(stats);
    callback();
  });
});
