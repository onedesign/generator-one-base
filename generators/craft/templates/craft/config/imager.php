<?php

/**
 * Configuration file for Imager
 */

return array(
  // General
  'imagerSystemPath' => $_SERVER['DOCUMENT_ROOT'] . '/imager/',

  // Progressive Images
  'interlace' => true,
  'allowUpscale' => false,

  // AWS Config
  // 'imagerUrl' => 'https://s3.amazonaws.com/<%= projectName %>/imager/',
  // 'awsEnabled' => true,
  // 'awsAccessKey' => '',
  // 'awsSecretAccessKey' => '',
  // 'awsBucket' => '<%= projectName %>',
  // 'awsFolder' => 'imager'
);
