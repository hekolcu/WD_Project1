<?php
require 'Slim/Slim.php';
require './ep.php';
require 'database.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();

$app->get('/carsForSale', 'getCarsForSale');
$app->get('/carsForSale/:id', 'getCarForSale');

$app->run();