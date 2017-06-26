//
//   Config
//
//////////////////////////////////////////////////////////////////////

var paths = {
  dist: '<%= rootDistPath %>/',

  styleSrc: 'src/styles/',
  styleDist: '<%= rootDistPath %>/styles/',

  scriptSrc: 'src/scripts/',
  scriptDist: '<%= rootDistPath %>/scripts/',

  templateSrc: '<%= templateSrc %>',
  templateDist: '<%= templateDist %>',

  imageSrc: 'src/images/',
  imageDist: '<%= rootDistPath %>/images/',<% if (platformTemplate == 'craft') { %>

  craftPath: 'craft/',<% } %>

  styleCopyPaths: [
  
  ],

  scriptCopyPaths: [
    'vendor'
  ]
};

module.exports = {
  paths: paths,

  // By default, Browsersync will create a dev server for you.
  // If you want BrowserSync to proxy an existing URL,
  // change `useProxy` to true and enter your URL as `proxyUrl`
  useProxy: <%= useProxy %>,
  proxyUrl: 'http://<%= projectName %>.dev',

  scripts: {
    // entry files: 
    // each filename listed here (and found in scriptSrc)
    // will have a file generated for it in scriptDist
    // (with all of its dependencies included)

    // For every entry here, we'll look for a file in scriptSrc
    // with a matching name, and if found, a corresponding
    // foo.bundle.js file will be generated in scriptDist
    entryFiles: [
      'main'
    ],

    // aliases:
    // If you want an npm module to point to a
    // file other than the one defined in 'main.js'
    // within 'package.json', add an entry to 'aliases':
    //
    // aliases: {
    //   packagename: 'packagename/dist/package.pkgd.js'
    // }
    //
    // You can also use aliases to include files not installed via npm
    // (it will automatically look for this package in /src/scripts/vendor)
    //
    // aliases: {
    //   packagename: 'packagename.js'
    // }

    aliases: {
      
    }
  }
};
