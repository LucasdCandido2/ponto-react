<?php
include 'db.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$result = $conn->query("SELECT id, horario, data_registro FROM horarios ORDER BY id ASC");
$horarios = [];

while ($row = $result->fetch_assoc()) {
    $horarios[] = $row;
}

// Retorna o JSON com os dados
echo json_encode($horarios);
echo json_encode($data);

exit;
?>
