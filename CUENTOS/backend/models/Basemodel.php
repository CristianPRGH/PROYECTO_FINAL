<?php

/*
    * = Prepara la query que recibe
    ** = Ejecuta la query con los parámetros que recibe
    *** = Pregunta si extsten filas resultantes de la query
    **** = Obtiene los datos de la query; Si no hay, obtiene False
    ***** = Retorna un array con un Error y Datos
*/

class Basemodel extends Database{

    protected function SelectAll($query, $params)
    {
        $stmt = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;  // **
        if ($error == 0)
            $error = $stmt->rowCount() > 0 ? 0 : 2; // ***
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);  // ****
        return $this->GetResult($error, $data);     // *****
    }

    protected function SelectOne($query, $params)
    {
        $stmt = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;  // **
        if ($error == 0)
            $error = $stmt->rowCount() > 0 ? 0 : 2; // ***
        $data = $stmt->fetch(PDO::FETCH_ASSOC);     // ****
        return $this->GetResult($error, $data);     // *****
    }

    protected function InsUpdDel($query, $params)
    {
        $stmt = $this->connect()->prepare($query);  // *
        $error = !$stmt->execute($params) ? 1 : 0;  // **
        return $this->GetResult($error);            // *****
    }

    protected function GetResult($error, $data = null)
    {
        return array(
            "error"=>$error,
            "data"=>$data
        );
    }
}