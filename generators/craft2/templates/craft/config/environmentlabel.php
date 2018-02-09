<?php
/**
 * This config file is only used if the Environment Label plugin is enabled
 * ref: https://github.com/madebykind/craft.labelenvironment/
 */
return array(
  'showLabel' => filter_var(getenv('APP_DEV_MODE'), FILTER_VALIDATE_BOOLEAN),
  'label' => 'Testing/Staging Environment',
  'prefix' => null,
  'suffix' => null,
  'labelColor' => '#0085a1',
  'textColor' => '#ffffff',
);
