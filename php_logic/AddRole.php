<?php

include_once "../DB_Connection/DB_Connection.php";


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


$msg = "";
if (isset($_POST["mode"]))
{
    $mode       = $_POST["mode"];
    $id         = $_POST["id"];
    $nombre     = $_POST["nombre"];
    $leer       = $_POST["leer"];
    $editar     = $_POST["editar"];
    $eliminar   = $_POST["eliminar"];
}
else if (isset($_GET["mode"]))
{
    $mode   = $_GET["mode"];
    $id     = $_GET["id"];
}


switch ($mode) {
    case 'INS':
        $query  = 'INSERT INTO roles (nombre, leer, editar, eliminar) VALUES (?, ?, ?, ?)';
        $params = [$nombre,$leer,$editar,$eliminar];
        $msg    = executeQuery($conn, $query, $params, 'siii');
        break;

    case 'UPD':
        $query  = 'UPDATE roles SET nombre = ?, leer = ?, editar = ?, eliminar = ? WHERE rolid = ?';
        $params = [$nombre,$leer,$editar,$eliminar, $id];
        $msg    = executeQuery($conn,$query, $params, 'siiii');
        break;

    case 'DLT':
        if ($id && $id != -1) {
            $query  = 'DELETE FROM roles WHERE rolid = ?';
            $params = [$id];
            $msg    = executeQuery($conn,$query, $params, 'i');
        }
        break;

    default:
        $msg = "Modo no válido";
}

header("Content-Type: application/json");
echo json_encode($msg);