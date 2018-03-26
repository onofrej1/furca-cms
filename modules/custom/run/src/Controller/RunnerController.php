<?php

namespace Drupal\run\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class RunnerController.
 */
class RunnerController extends ControllerBase {

  /**
   * Index.
   *
   * @return string
   *   Return Hello string.
   */
  public function index() {

    $build = [
      '#theme' => 'my_template',
      '#test_var' => $this->t('Test Value'),
      '#attached' => array(
        'library' => array(
          'run/test',
          'run/vue'
        ),
      ),      
    ];

    /*$build['my_template']['#attached']['library'][] = 'run/vue';
    $build['my_template']['#attached']['library'][] = 'run/test';*/

    return $build;
    
    /*return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: index')
    ];*/
  }
  /**
   * Create.
   *
   * @return string
   *   Return Hello string.
   */
  public function new() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Implement method: create')
    ];
  }

}
