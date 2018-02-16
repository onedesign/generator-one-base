module.exports =  function(platform, key) {
  if (typeof platform === 'undefined') platform = 'static';

  var platformDefaults = {
    static: {
      rootDistPath: 'dist',
      templateSrc: './',
      templateDist: './',
      serverBaseDir: './',
      useProxy: false
    },

    staticNunjucks: {
      rootDistPath: 'dist',
      templateSrc: 'src/templates/',
      templateDist: 'dist/',
      serverBaseDir: 'dist/',
      useProxy: false
    },

    craft2: {
      rootDistPath: 'public/dist',
      templateSrc: 'craft/templates/',
      templateDist: 'craft/templates/',
      useProxy: true,
      serverBaseDir: './'
    },

    craft3: {
      rootDistPath: 'web/dist',
      templateSrc: 'templates/',
      templateDist: 'templates/',
      useProxy: true,
      serverBaseDir: './'
    }
  }

  // If a key was provided, return just that key value
  if (typeof key !== 'undefined') {
    return platformDefaults[platform][key];
  } else {
    // Return the appropriate platform defaults object
    return platformDefaults[platform];
  }
};