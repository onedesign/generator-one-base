<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

return [
    '*' => [
      // This appId is used to generate a unique prefix for session cookies and cache locations across our dev environments 

      'appId'                              => getenv('APP_SITE_URL'),

      // FUZZY SEARCH
      
      'defaultSearchTermOptions' => array(
          'subLeft' => true,
          'subRight' => true,
      ),

      // ASSETS

      'imageDriver'                       => getenv('APP_IMAGE_DRIVER'),
      'defaultImageQuality'               => getenv('APP_DEFAULT_IMAGE_QUALITY'),
      'extraAllowedFileExtensions'        => getenv('EXTRA_ALLOWED_FILE_EXTENSIONS'),

      // MISC

      'devMode'                           => filter_var(getenv('APP_DEV_MODE'), FILTER_VALIDATE_BOOLEAN),
      'phpMaxMemoryLimit'                 => getenv('APP_PHP_MAX_MEMORY_LIMIT'),
      'overridePhpSessionLocation'        => getenv('OVERRIDE_PHP_SESSION_LOCATION'),

      // URLS

      'omitScriptNameInUrls'               => true,
      'siteUrl'                            => getenv('APP_SITE_URL'),
      'cpTrigger'                          => getenv('APP_CP_TRIGGER'),

      // CACHING

      'enableTemplateCaching'               => filter_var(getenv('APP_ENABLE_TEMPLATE_CACHING'), FILTER_VALIDATE_BOOLEAN),
    ]
];
