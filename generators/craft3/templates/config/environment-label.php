<?php

return [
  'showLabel' => filter_var(getenv('APP_DEV_MODE'), FILTER_VALIDATE_BOOLEAN),
  'label' => 'Testing/Staging Environment',
  'prefix' => null,
  'suffix' => null,
  'labelColor' => '#0085a1',
  'textColor' => '#ffffff',
];
