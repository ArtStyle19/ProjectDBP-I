<?php
// incidencias.php (backend)

// Conexión a la base de datos (ajusta los valores según tu configuración)
$servername = "localhost";
$username = "u215167";
$password = "1893470";
$dbname = "u215167";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Verifica si se ha recibido una solicitud POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtiene los datos del formulario y las coordenadas
    $nombre = $_POST["nombres"];
    $incidencia = $_POST["incidencia"];
    $descripcion = $_POST["descripcion"];
    $foto = $_POST["foto"];
    $latitud = $_POST["latitude"];
    $longitud = $_POST["longitude"];

    // Prepara y ejecuta la consulta para insertar los datos en la base de datos
    $sql = "INSERT INTO registro (nombres, apellidos, correo, dni, celular)
            VALUES ('$nombre', '$incidencia', '$descripcion','$latitud', '$longitud')";

    if ($conn->query($sql) === TRUE) {
        echo "Incidencia registrada exitosamente";
    } else {
        echo "Error al registrar la incidencia: " . $conn->error;
    }
}

$conn->close();
?>
