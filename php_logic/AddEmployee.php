<?php
// header("Location: ../pages/Home.php");

$conn = mysqli_connect("localhost", "root", "", "test");

if (!$conn)    // COMPRUEBA SI SE HA CONECTADO CORRECTAMENTE
{
    die("Connection failed: " . mysqli_connect_error());
}

$msg = "";
$valores = [];
// if (isset($_POST["addEmployee"])) 
// {
    $id         = $_POST["id"];
    $dni        = $_POST["dni"];
    $nombre     = $_POST["nombre"];
    $apellidos  = $_POST["apellidos"];
    $fechanac   = date("Y-m-d", strtotime($_POST["fechanacimiento"]));
    $telefono   = $_POST["telefono"];
    $direccion  = $_POST["direccion"];
    $email      = $_POST["email"];
    // $empresa    = $_POST["empresa"];

    $valores = array(
        $dni,
        $nombre,
        $apellidos,
        $fechanac,
        $telefono,
        $direccion,
        $email,
        // $empresa
    );

    foreach ($valores as $key => $value) {
        $valores[$key] = '"' . $value . '"';
    }

    // print_r($valores);

    $valoresQuery = implode(',', $valores);

    if ($_POST["mode"] === "INS") 
    {
        $query = 'INSERT INTO empleados (dni, nombre, apellidos, fechanacimiento, telefono, direccion, email) VALUES (?,?,?,?,?,?,?)';

        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param('sssssss', 
                $dni, 
                $nombre,  
                $apellidos, 
                $fechanac,
                $telefono,  
                $direccion, 
                $email, 
                // $valoresQuery[6]
            );


            // Ejecutar la consulta
            if ($stmt->execute()) {
                $msg = "Actualización exitosa";
            } else {
                $msg = "Error al actualizar: " . $stmt->error;
            }

            $conn->close();
        } else {
            $msg = "Error al preparar la consulta: " . $conn->error;
        }
    }
    
    if ($_POST["mode"] === "UPD")
    {
        $query = 'UPDATE empleados SET 
            dni = ?, 
            nombre = ?, 
            apellidos = ?,
            fechanacimiento = ?,
            telefono = ?, 
            direccion = ?, 
            email = ? 
            -- empresa = ? 
            WHERE id = ?';

        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param('sssssssi', 
                $dni,
                $nombre, 
                $apellidos,
                $fechanac,
                $telefono, 
                $direccion, 
                $email, 
                $id
            );
            // $valoresQuery[6], 
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                $msg = "Actualización exitosa";
            } else {
                $msg = "Error al actualizar: " . $stmt->error;
            }

            $conn->close();
        } else {
            $msg = "Error al preparar la consulta: " . $conn->error;
        }
    }

    if (isset($_GET["mode"]) && $_GET["mode"] === "DLT")
    {
        if ($_GET["id"] && $_GET["id"] != -1)
        {
            $id = $_GET["id"];
            $query = 'DELETE FROM empleados WHERE id = ?';

            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param('i', $id);
            }

            if ($stmt->execute()) {
                $msg = "Actualización exitosa";
            } else {
                $msg = "Error al actualizar: " . $stmt->error;
            }

            $conn->close();
        }
    }

    header("Content-Type: application/json");
    echo json_encode($msg);
    
// }
?>