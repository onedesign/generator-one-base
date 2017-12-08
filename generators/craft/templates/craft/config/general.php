<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

if (!function_exists('siteUrlSetting')) {
    /**
     * If the APP_SITE_URL environment variable is set, that is returned. Otherwise,
     * this function builds a site URL dynamically using server variables. This allows
     * us to use multiple domains to for the same craft instance.
     *
     * @return string site url
     */
    function siteUrlSetting() {
        $envVar = getenv('APP_SITE_URL');

        if (!empty($envVar)) {
            return $envVar;
        }

        // The @ is used to suppress errors when this file is executed from the command line.

        $sslOn = (!empty(@$_SERVER['HTTPS']) && @$_SERVER['HTTPS'] !== 'off') || @$_SERVER['SERVER_PORT'] == 443;
        $port = !in_array(@$_SERVER['SERVER_PORT'], array(null, '80', '443')) ? ':' . @$_SERVER['SERVER_PORT'] : '';

        return 'http' . ($sslOn ? 's' : '') . '://' . @$_SERVER['SERVER_NAME'] . $port;
    }
}


return array(

    // This is needed so that things like { siteUrl } can be used in the Craft Admin

    'environmentVariables' => array(
      'siteUrl'                         => siteUrlSetting()
    ),

    // This appId is used to generate a unique prefix for session cookies and cache locations across our environments

    'appId'                              => siteUrlSetting(),

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
    'siteUrl'                            => siteUrlSetting(),

    // CACHING

    'enableTemplateCaching'               => filter_var(getenv('APP_ENABLE_TEMPLATE_CACHING'), FILTER_VALIDATE_BOOLEAN),
);
