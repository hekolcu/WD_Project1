<?php
require 'Slim/Slim.php';
require './ep.php';
require 'database.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();

$app->get('/carsForSale', 'getCarsForSale');
$app->get('/carsForSale/:id', 'getCarForSale');

$app->post('/carsForSale', 'addCarForSale');

$app->delete('/carsForSale/:id', 'deleteCarForSale');

$app->put('/carsForSale/:id', 'updateCarForSale');
$app->put('/sellCar/:id', 'sellCar');

$app->run();
