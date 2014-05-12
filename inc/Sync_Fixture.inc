<?php

class Sync_Fixture {

  function reset() {
    $result = db_select('node', 'n')
      ->fields('n', array('nid'))
      ->execute();
    $deleted_count = 0;
    foreach ($result as $record) {
      node_delete($record->nid);
      $deleted_count++;
    }

    print "Deleted $deleted_count nodes.\n";

    // Reset the auto increments to ensure consistent nids and vids
    db_query('ALTER TABLE  `node` AUTO_INCREMENT=1');
    db_query('ALTER TABLE  `node_revision` AUTO_INCREMENT=1');

  }

  function populate() {
    $node = new stdClass();
    $node->title = 'Desa';
    $node->type = 'character';
    node_save($node);
  }

  function modify() {
    $node = node_load(1);
    $node->title = 'Desa 2';
    node_save($node);
  }

  function deletion() {
    node_delete(1);
  }
}