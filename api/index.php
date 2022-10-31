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
$app->post('/addCarPhoto/:car_id', 'addCarPhoto');

$app->delete('/carsForSale/:id', 'deleteCarForSale');
$app->delete('/deleteCarPhoto/:car_id/:pic_id', 'deleteCarPhoto');

$app->put('/carsForSale/:id', 'updateCarForSale');
$app->put('/sellCar/:id', 'sellCar');

$app->run();
