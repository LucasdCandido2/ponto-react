<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $horario = $_POST['horario']; // Recebe o horário enviado

    $stmt = $conn->prepare("INSERT INTO horarios (horario) VALUES (?)");
    $stmt->bind_param("s", $horario);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Horário adicionado!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar horário.']);
    }

    $stmt->close();
    exit; // Garante que não haverá saída extra
}
?>
