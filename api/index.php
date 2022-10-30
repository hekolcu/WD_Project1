<?php
require 'Slim/Slim.php';
require './carsEndPoints.php';
require 'database.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();

$app->get('/runners', 'getRunners');

$app->run();
