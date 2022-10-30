<?php

function getCarsForSale() {
    global $db;
    try {
        $stmt = $db->query("SELECT * FROM cars_for_sale");
        $carsForSale = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($carsForSale);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getCarForSale($id) {
    global $db;
    try {
        $stmt = $db->prepare(
            "SELECT * FROM cars_for_sale WHERE car_id = :id"
        );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $carForSale = $stmt->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($carForSale);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addCarForSale(){
    global $app;
    $request = $app->request();
    $carForSale = json_decode($request->getBody());
    try {
        global $db;
        $stmt = $db->prepare(
            "INSERT INTO cars_for_sale 
                (seller_id, title, price, description, model, color, state, production_date, purchase_date) 
            VALUES 
                (:seller_id, :title, :price, :description, :model, :color, :state, :production_date, :purchase_date)"
        );
        $stmt->bindParam("seller_id", $carForSale->seller_id);
        $stmt->bindParam("title", $carForSale->title);
        $stmt->bindParam("price", $carForSale->price);
        $stmt->bindParam("description", $carForSale->description);
        $stmt->bindParam("model", $carForSale->model);
        $stmt->bindParam("color", $carForSale->color);
        $stmt->bindParam("state", $carForSale->state);
        $stmt->bindParam("production_date", $carForSale->production_date);
        $stmt->bindParam("purchase_date", $carForSale->purchase_date);
        // $stmt->execute([$carForSale->seller_id, $carForSale->title, $carForSale->price, $carForSale->description, $carForSale->model, $carForSale->color, $carForSale->state, $carForSale->production_date, $carForSale->purchase_date]);
        $stmt->execute();
        $carForSale->car_id = $db->lastInsertId();
        header("Content-Type: application/json");
        echo json_encode($carForSale);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}