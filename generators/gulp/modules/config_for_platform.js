module.exports =  function(platform, key) {
  if (typeof platform === 'undefined') platform = 'static';

  var platformDefaults = {
    static: {
      rootDistPath: 'dist',
      templateSrc: 'src/templates/',
      templateDist: 'dist/'
    },

    craft2: {
      rootDistPath: 'public/dist',
      templateSrc: 'craft/templates/',
      templateDist: 'craft/templates/',
      serverBaseDir: './'
    },

    craft3: {
      rootDistPath: 'web/dist',
      templateSrc: 'templates/',
      templateDist: 'templates/',
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