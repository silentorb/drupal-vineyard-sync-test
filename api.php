<?php
require_once 'bootstrap.inc';
$fixture = new Sync_Fixture();

$action_string = $argv[1];
if ($action_string) {
  $actions = explode('+', $action_string);
  foreach($actions as $action){
    $fixture->{$action}();
  }
}

print "\n";