<?php

// Assumes path sites/all/modules/custom/vineyard_sync_test
chdir(dirname(__FILE__) . '/../../../../..');
define('IS_PHPUNIT_TEST', true);
//print getcwd();
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
define('DRUPAL_ROOT', getcwd());
require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//$path = drupal_get_path('module', 'vineyard_sync_test');

//require_once $path . '/inc/Sync_Fixture.inc';

