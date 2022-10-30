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
        $stmt = $db->prepare("SELECT * FROM cars_for_sale WHERE car_id = :id");
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $carForSale = $stmt->fetch(PDO::FETCH_ASSOC);
        header("Content-Type: application/json");
        echo json_encode($carForSale);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}