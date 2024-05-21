<?php

session_start();

function getDbConnection() {
    $conn = new mysqli("localhost", "root", "", "cristianperez_erp");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

try {
    $conn = getDbConnection();
    
    if (isset($_POST["username"]) && isset($_POST["password"]))
    {
        $username = $_POST["username"];
        $password = sha1(md5($_POST["password"]));

        $query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';

        $params[] = $username;
        $params[] = $password;
        $types = "ss";

        $stmt = $conn->prepare($query);

        if ($stmt && count($params) > 0) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        // print_r($result);

        $data = [];
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) $data[] = $row;

        if (count($data) > 0) 
        { 
            $code = 0;
            $description = "OK"; 
            CreaSesion($data[0]["id"], $username);
        }
        else { $code = 1; $description = "El usuario o la contraseña no son correctos"; }
    }


} catch (\Throwable $th) {
    $code = 2;
    $description = "Error en la conexion a la base de datos";
}finally{
    $conn->close();
}

$resultado = array(
    "code"=>$code,
    "description"=>$description
);

header("Content-Type: application/json");
echo json_encode($resultado);


function CreaSesion($id, $user)
{
    $_SESSION["id"] = $id;
    $_SESSION["user"] = $user;
}