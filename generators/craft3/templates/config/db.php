<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 */

return [
    'driver' => getenv('APP_DB_DRIVER'),
    'server' => getenv('APP_DB_SERVER'),
    'user' => getenv('APP_DB_USER'),
    'password' => getenv('APP_DB_PASSWORD'),
    'database' => getenv('APP_DB_DATABASE'),
    'schema' => getenv('APP_DB_SCHEMA'),
    'tablePrefix' => getenv('APP_DB_TABLE_PREFIX'),
    'port' => getenv('APP_DB_PORT')
];
