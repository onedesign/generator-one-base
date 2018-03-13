<?php

/**
 * Configuration file for Imager
 */

// Import the environment variables file path
$env = require(dirname(dirname(__FILE__)).'/../.env.php');

return array(
  // General
  'imagerSystemPath' => $env['IMAGER_SYSTEM_PATH'],

  // Progressive Images
  'interlace' => true,
  'allowUpscale' => false,

  // AWS Config
  // 'awsEnabled' => $env['AWS_ENABLED'],
  // 'imagerUrl' => $env['IMAGER_URL'],
  // 'awsAccessKey' => $env['AWS_ACCESS_KEY'],
  // 'awsSecretAccessKey' => $env['AWS_SECRET_ACCESS_KEY'],
  // 'awsBucket' => $env['AWS_BUCKET'],
  // 'awsFolder' => $env['AWS_FOLDER']
);
