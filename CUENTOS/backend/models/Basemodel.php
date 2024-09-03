<?php

/*
    * = Prepara la query que recibe
    ** = Ejecuta la query con los parámetros que recibe
    *** = Pregunta si extsten filas resultantes de la query
    **** = Obtiene los datos de la query; Si no hay, obtiene False
    ***** = Retorna un array con un Error y Datos
*/

class Basemodel extends Database{

    protected function SelectAll($query, $params = null)
    {
        $stmt  = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;   // **
        if ($error == 0) 
            $error = $stmt->rowCount() > 0 ? 0 : 2;  // ***
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);   // ****
        $result = $this->GetResult($error, $data);      // *****
        $result["selectedRows"] = $stmt->rowCount();
        return $result;
    }

    protected function SelectOne($query, $params)
    {
        $stmt  = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;   // **
        if ($error == 0)
            $error = $stmt->rowCount() > 0 ? 0 : 2;  // ***
        $data = $stmt->fetch(PDO::FETCH_ASSOC);      // ****
        $result = $this->GetResult($error, $data);      // *****
        // $result["selectedRows"] = $stmt->rowCount();
        return $result;
    }

    // protected function InsUpdDel($query, $params)
    // {
    //     // print_r($params);
    //     $conn  = $this->connect();
    //     $stmt  = $conn->prepare($query);             // *
    //     $error = !$stmt->execute($params) ? 1 : 0;   // **

    //     $last_id = $this->GetLastId($conn, $query);

    //     return $this->GetResult($error,null,$last_id); // *****
    // }

    protected function InsertRows($query, $params)
    {
        // echo $query;
        // print_r($params);
        $conn  = $this->connect();
        $stmt  = $conn->prepare($query);             // *
        $error = !$stmt->execute($params) ? 1 : 0;   // **

        $result = $this->GetResult($error);
        $result["lastid"] = $conn->lastInsertId();
        return $result; // *****
    }

    protected function UpdateRows($query, $params)
    {
        $stmt  = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;   // **

        $affectedRows = $stmt->rowCount();
        $result = $this->GetResult($error);
        $result["affectedRows"] = $affectedRows;
        return $result; // *****
    }

    protected function DeleteRows($query, $params)
    {
        $stmt  = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;   // **

        $affectedRows = $stmt->rowCount();
        $result = $this->GetResult($error);
        $result["affectedRows"] = $affectedRows;
        return $result; // *****
    }

    protected function GetResult($error, $data = null, $lastid = null)
    {
        return array(
            "error"=>$error,
            "data"=>$data
        );
    }

    // private function GetLastId($conn, $query)
    // {
    //     $split = explode(" ", $query);
    //     $first = array_shift($split);
    //     return strtolower($first) == "insert" ? $conn->lastInsertId() : null;
    // }
}