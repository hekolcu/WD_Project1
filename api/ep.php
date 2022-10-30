<?php

function getCarsForSale() {
    global $db;
    try {
        $stmt = $db->query("SELECT * FROM cars_for_sale");
        $carsForSale = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo '{"carsForSale": ' . json_encode($carsForSale) . '}';
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}