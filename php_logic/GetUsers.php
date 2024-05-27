<?php

include "../DB_Connection/DB_Connection.php";

function buildConditionsAndParams() {
    $conditions = [];
    $params = [];
    $types = "";

    if (isset($_GET["filter-name"]))
    {
        $filterName = $_GET["filter-name"];
        if ($filterName) {
            $fullName = explode(" ", $filterName);
            foreach ($fullName as $value) {
                $conditions[] = "nombre LIKE ? OR apellidos LIKE ?";
                $params[] = "%" . $value . "%";
                $params[] = "%" . $value . "%";
                $types .= "ss";
            }
        }
    }

    if (isset($_GET["filter-date"]))
    {
        $filterDate = $_GET["filter-date"];
        if ($filterDate) {
            $conditions[] = "fechanacimiento LIKE ?";
            $params[] = "%" . $filterDate . "%";
            $types .= "s";
        }
    }

    // $filterID = filter_input(INPUT_GET, 'filter-id', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    // if ($filterID) {
    //     $conditions[] = "id LIKE ?";
    //     $params[] = "%" . $filterID . "%";
    //     $types .= "s";
    // }

    return [$conditions, $params, $types];
}

try {
    $columnaExcluir = "password";
    $result = $conn->query("SHOW COLUMNS FROM usuarios");
    if ($result->num_rows > 0) {
        $columnas = [];
        while ($row = $result->fetch_assoc()) {
            $columnas[] = $row['Field'];
        }
        
        // Excluir la columna no deseada // Se utilza USE para poder utilizar variables externas a la función anónima
        $columnasIncluir = array_filter($columnas, function($col) use ($columnaExcluir) {
            return $col !== $columnaExcluir;
        });
    }
    
            // print_r($columnasIncluir);

    $query = "SELECT ".implode(', ',$columnasIncluir)." FROM usuarios";
    
    list($conditions, $params, $types) = buildConditionsAndParams();

    if (count($conditions) > 0) {
        $query .= " WHERE " . implode(" OR ", $conditions);
    }

    $stmt = $conn->prepare($query);

    if ($stmt && count($params) > 0) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
        $data[] = $row;
    }

    if (count($data) > 0) {
        $code = 0;
        $description = "";
    } else {
        $code = 1;
        $description = "No hay registros";
    }

} catch (\Throwable $th) {
    $code = 10;
    $description = "Error en bbdd";
} finally {
    $conn->close();
}

header("Content-Type: application/json");
$result = [
    "datos" => $data,
    "code" => $code,
    "descripcion" => $description
];
echo json_encode($result);