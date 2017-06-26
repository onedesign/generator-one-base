module.exports =  function(platform, key) {
  if (typeof platform === 'undefined') platform = 'none';

  var platformDefaults = {
    none: {
      rootDistPath: 'dist',
      templateSrc: '',
      templateDist: ''
    },

    craft: {
      rootDistPath: 'public/dist',
      templateSrc: 'craft/templates/',
      templateDist: 'craft/templates/'
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