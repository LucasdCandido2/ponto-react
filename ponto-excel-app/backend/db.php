<?php
$host = '127.0.0.1'; // Ou o IP do servidor
$user = 'root';      // Seu usuário do MySQL
$password = '';      // Sua senha do MySQL
$database = 'horarios_app'; // Nome do banco de dados

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
