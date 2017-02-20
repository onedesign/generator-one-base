<?php

/**
 * Configuration file for Imager
 */

return array(

  // Progressive Images
  'interlace' => true,
  'allowUpscale' => false,

  // AWS Config
  'imagerSystemPath' => $_SERVER['DOCUMENT_ROOT'] . '/imager/',
  'imagerUrl' => 'https://s3.amazonaws.com/<%= projectName %>/imager/',
  'awsEnabled' => true,
  'awsAccessKey' => '',
  'awsSecretAccessKey' => '',
  'awsBucket' => '<%= projectName %>',
  'awsFolder' => 'imager' 
);
