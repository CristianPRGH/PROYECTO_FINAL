<?php

include "../DB_Connection/DB_Connection.php";

header("Location: ../pages/Main.php");

function executeQuery($conn, $query, $params, $types) {
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

$msg        = "";

if (isset($_POST["mode"]))
{
    $mode       = $_POST["mode"];

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
    $rolid      = $_POST["rol"];
}
else if (isset($_GET["mode"]))
{
    $mode   = $_GET["mode"];
    $id     = $_GET["id"];
}

switch ($mode) {
    case 'INS':
        $query  = 'INSERT INTO usuarios (dni, nombre, apellidos, fechanacimiento, telefono, direccion, email, usuario, password, rolid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = [$dni, $nombre, $apellidos, $fechanac, $telefono, $direccion, $email, $usuario, $password, $rolid];
        $msg    = executeQuery($conn, $query, $params, 'sssssssssi');
        break;

    case 'UPD':
        $query  = 'UPDATE usuarios SET dni = ?, nombre = ?, apellidos = ?, fechanacimiento = ?, telefono = ?, direccion = ?, email = ?, usuario = ?, password = ?, rolid = ? WHERE userid = ?';
        $params = [$dni, $nombre, $apellidos, $fechanac, $telefono, $direccion, $email, $usuario, $password, $rolid, $id];
        $msg    = executeQuery($conn, $query, $params, 'sssssssssii');
        break;

    case 'DLT':
        if ($id && $id != -1) {
            $query  = 'DELETE FROM usuarios WHERE userid = ?';
            $params = [$id];
            $msg    = executeQuery($conn, $query, $params, 'i');
        }
        break;

    default:
        $msg = "Modo no válido";
}

// header("Content-Type: application/json");
// echo json_encode($msg);