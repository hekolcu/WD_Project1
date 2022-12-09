<?php
require 'Slim/Slim.php';
require './ep.php';
require 'database.php';

use Slim\Slim;
\Slim\Slim::registerAutoloader();

$app = new Slim();

$app->get('/cars', 'getCarsForSale');
$app->get('/cars/:id', 'getCarForSale');
$app->get('/cars/photos/:id', 'getCarPhotos');
$app->get('/cars/search/:query', 'getCarsForSaleSearch');

$app->post('/cars', 'addCarForSale');
$app->post('/cars/photos/:car_id', 'addCarPhoto');
$app->post('/admin', 'registerAdmin');
$app->post('/seller', 'registerSeller');
$app->post('/buyer', 'registerBuyer');
$app->post('/roles/:id', 'addRole');

$app->delete('/cars/:id', 'deleteCarForSale');
$app->delete('/cars/photo/:car_id/:pic_id', 'deleteCarPhoto');
$app->delete('/roles/:id', 'deleteRole');

$app->put('/cars/:id', 'updateCarForSale');
$app->put('/cars/sell/:id', 'sellCar');

$app->run();
