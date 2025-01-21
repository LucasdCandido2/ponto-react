<?php
include 'db.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($conn->query("TRUNCATE TABLE horarios")) {
        echo json_encode(['status' => 'success', 'message' => 'Horários limpos!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao limpar horários.']);
    }
    exit;
}
?>
