<?php

function getCarsForSale() {
    global $db;
    try {
        $stmt = $db->query("SELECT car_id, seller_id, title, price, description, model, color, state, production_date, purchase_date, post_date FROM cars_for_sale WHERE sold = 0");
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
            "SELECT * FROM cars_for_sale WHERE car_id = :id where sold = 0"
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

function deleteCarForSale($id){
    try {
        global $db;
        // select sold from cars_for_sale where car_id = $id
        $stmt = $db->prepare(
            "SELECT sold FROM cars_for_sale WHERE car_id = :id"
        );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $carForSale = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($carForSale['sold'] == 0) {
            // delete from cars_for_sale where car_id = $id
            $stmt = $db->prepare(
                "DELETE FROM cars_for_sale WHERE car_id = :id"
            );
            $stmt->bindParam("id", $id);
            $stmt->execute();
            echo '{"success":{"text":"Car for sale deleted"}}';
        } else {
            echo '{"error":{"text":"Car for sale already sold"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function sellCar($id){
    try {
        global $db;
        $stmt = $db->prepare(
            "UPDATE cars_for_sale SET sold = 1 WHERE car_id = :id"
        );
        $stmt->bindParam("id", $id);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo '{"success":{"text":"Car sold"}}';
        } else {
            echo '{"error":{"text":"Car not found"}}';
        }
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
