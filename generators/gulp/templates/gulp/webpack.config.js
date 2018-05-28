const config = require("./config");
const path = require("path");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const webpack = require("webpack");

const hotMiddleware =
  "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr&noInfo=true&quiet=true";
const nodeEnv = process.env.NODE_ENV || "development";
const isDev = nodeEnv === "development";
const hot = config.scripts.hot;

// ---------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------

const plugins = [
  // Give all modules access to jQuery
  new webpack.ProvidePlugin({
    ...config.scripts.provide
  })
];

// If we're in a development environment add
// 1) Named Modules Plugin
//    (https://webpack.js.org/plugins/named-modules-plugin/)
// 2) (if hot) Hot Module replacement plugin
//    (https://webpack.js.org/plugins/hot-module-replacement-plugin/)
if (isDev) {
  plugins.push(new webpack.NamedModulesPlugin());

  if (hot) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
}

// If additional webpack Plugins are specified, add them
if (
  config.scripts.additionalWebpackPlugins &&
  config.scripts.additionalWebpackPlugins.length
) {
  plugins.push(...additionalWebpackPlugins);
}

// Converting our paths to absolute paths to make them more bulletproof
const resolvedPaths = {
  src: path.resolve(config.paths.scriptSrc),
  dist: path.resolve(config.paths.scriptDist)
};

// ---------------------------------------------------------------
// Config
// ---------------------------------------------------------------

module.exports = {
  entry: config.scripts.entryFiles.reduce((acc, name) => {
    acc[name] = [path.resolve(resolvedPaths.src, name)];

    if (hot) {
      acc[name].push(hotMiddleware);
    }

    return acc;
  }, {}),

  output: {
    path: resolvedPaths.dist,
    publicPath: `/${config.paths.scriptDist}`,
    filename: "[name].bundle.js"
  },

  mode: nodeEnv,

  devtool: isDev ? "cheap-module-source-map" : "source-map",

  resolve: {
    modules: [
      path.resolve("./node_modules"),
      path.resolve(resolvedPaths.src, "vendor")
    ],
    alias: config.scripts.aliases
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolvedPaths.src,
        enforce: "pre",
        use: [
          {
            loader: require.resolve("eslint-loader"),
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            }
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                [
                  "env",
                  {
                    targets: {
                      browsers: config.browserlist
                    }
                  }
                ],
                "react"
              ]
            },
            exclude: [/node_modules/]
          }
        ]
      }
    ]
  },

  plugins: plugins
};
