<?php

// Conexión a la base de datos
$servername = "localhost";
$username = "u215167";
$password = "1893470";
$dbname = "u215167";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Consulta SQL para obtener las coordenadas
$sql = "SELECT id, dni, celular, nombres, correo FROM registro";
$result = $conn->query($sql);

$coordinates = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Agregar cada conjunto de coordenadas al arreglo
        $coordinates[] = array(
            'id' => $row['id'],
            'lat' => $row['dni'],
            'lng' => $row['celular'],
            'nameGet' => $row['nombres'],
            'Descripcion' => $row['correo'],
        );
    }
}

// Cerrar la conexión a la base de datos
$conn->close();

// Devolver las coordenadas como una respuesta JSON
header('Content-Type: application/json');
echo json_encode($coordinates);
?>
