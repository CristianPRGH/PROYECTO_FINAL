<?php

    // echo count($_GET);    
    try {
        $conn = mysqli_connect("localhost", "root", "", "test");    // CONEXIÓN A LA BASE DE DATOS

        if (!$conn)    // COMPRUEBA SI SE HA CONECTADO CORRECTAMENTE
        {
            die("Connection failed: " . mysqli_connect_error());
        }

        $query = "SELECT * FROM empleados";  // QUERY BASE
        $params = [];
        $types = "";

        if (count($_GET) > 0)   // PREGUNTA SI HAY FILTROS
        {
            $filterName = $filterDate = "";
            $conditions = [];

            if (isset($_GET["filter-name"]))
            {
                $filterName = $_GET["filter-name"];         // RECUPERA EL VALOR DEL FILTRO
                $fullName = explode(" ", $filterName);

                foreach ($fullName as $key => $value) {
                    $conditions[] = "nombre LIKE ?";        // AÑADE LA CONDICIÓN / EL SÍMBOLO '?' INDICA LA POSICIÓN DEL VALOR DEL FILTRO, ESTE SE SUSTITUYE POR $PARAMS[] EN "BIND_PARAM()"
                    $params[] = "%" . $value . "%";         // AÑADE LOS PARAMETROS
                    $types .= "s";                          // AÑADE EL TIPO DEL VALOR DEL FILTRO (s = string)
                }
                                        
                foreach ($fullName as $key => $value) {
                    $conditions[] = "apellidos LIKE ?";        
                    $params[] = "%" . $value . "%";    
                    $types .= "s";
                }
            }

            if (isset($_GET["filter-date"]))
            {
                $filterDate = $_GET["filter-date"];
                $conditions[] = "fechanacimiento LIKE ?";
                $params[] = "%" . $filterDate . "%";
                $types .= "s";
            }

            if (isset($_GET["filter-id"]))
            {
                $filterID = $_GET["filter-id"];
                $conditions[] = "id LIKE ?";
                $params[] = "%" . $filterID . "%";
                $types .= "s";
            }



            if (count($conditions) > 0)             // SI HAY CONDICIONES PREPARA LA QUERY COMPLETA
            {
                $query .= " WHERE " . implode(" OR ", $conditions);
            }
        }

        $stmt = $conn->prepare($query);             // PREPARA LA QUERY PARA LA EJECUCUÓN

        if ($stmt && count($params) > 0)            // VINCULA LOS TIPOS Y LOS PARAMETROS QUE SE SUSTITUIRAN EN LA QUERY FINAL
        {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();                       // EJECUTA LA QUERY
        $result = $stmt->get_result();          // RETORNA EL RESULTADO

        $data = [];
        while ($row = mysqli_fetch_array($result))
        {
            array_push($data,$row);
        }

        if (count($data) > 0) { $code = 0; $description = ""; }
        else{ $code = 1; $description = "No hay registros"; }

    } catch (\Throwable $th) {
        //throw $th;
        $code = 10;
        $description = "Error en bbdd";
    } finally {
        $conn->close();
    }

    header("Content-Type: application/json");
    // $result = new Arr
    $result = array(
        "datos"=>$data,
        "code"=>$code,
        "descripcion"=>$description
    );
    echo json_encode($result);

?>