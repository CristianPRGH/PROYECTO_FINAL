<?php

function getDbConnection() {
    $conn = new mysqli("localhost", "root", "", "cristianperez_erp");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function executeQuery($query, $params, $types) {
    $conn = getDbConnection();
    $stmt = $conn->prepare($query);
    if ($stmt) {
        $stmt->bind_param($types, ...$params);
        if ($stmt->execute()) {
            $msg = "Operación exitosa";
        } else {
            $msg = "Error al ejecutar la consulta: " . $stmt->error;
        }
        $stmt->close();
    } else {
        $msg = "Error al preparar la consulta: " . $conn->error;
    }
    $conn->close();
    return $msg;
}

$msg = "";
$mode = $_POST["mode"];

$id         = $_POST["id"];
$dni        = $_POST["dni"];
$nombre     = $_POST["nombre"];
$apellidos  = $_POST["apellidos"];
$fechanac   = date("Y-m-d", strtotime($_POST["'fechanacimiento"]));
$telefono   = $_POST["telefono"];
$direccion  = $_POST["direccion"];
$email      = $_POST["email"];
$usuario    = $_POST["usuario"];
$password   = sha1(md5($_POST["password"]));


switch ($mode) {
    case 'INS':
        $query  = 'INSERT INTO usuarios (dni, nombre, apellidos, fechanacimiento, telefono, direccion, email, usuario, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = [$dni, $nombre, $apellidos, $fechanac, $telefono, $direccion, $email, $usuario, $password];
        $msg    = executeQuery($query, $params, 'sssssssss');
        break;

    case 'UPD':
        echo "hola";
        $query  = 'UPDATE usuarios SET dni = ?, nombre = ?, apellidos = ?, fechanacimiento = ?, telefono = ?, direccion = ?, email = ?, usuario = ?, password = ? WHERE id = ?';
        $params = [$dni, $nombre, $apellidos, $fechanac, $telefono, $direccion, $email, $usuario, $password, $id];
        $msg    = executeQuery($query, $params, 'sssssssssi');
        break;

    case 'DLT':
        $id = $_GET["id"];
        if ($id && $id != -1) {
            $query  = 'DELETE FROM empleados WHERE id = ?';
            $params = [$id];
            $msg    = executeQuery($query, $params, 'i');
        }
        break;

    default:
        $msg = "Modo no válido";
}

header("Content-Type: application/json");
echo json_encode($msg);