<?php

class Basemodel extends Database{

    private $table;

    protected function SetTable($table)
    {
        $this->table = $table;
    }

    protected function FindAll()
    {
        $stmt = $this->connect()->prepare("SELECT * FROM $this->table");
        $error = !$stmt->execute() ? 1 : 0;
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->GetResult($error, $data);
    }

    protected function FindByID($id)
    {
        $stmt = $this->connect()->prepare("SELECT * FROM $this->table WHERE id = ?");
        $error = !$stmt->execute([$id]) ? 1 : 0;
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $this->GetResult($error, $data);
    }

    protected function FindCustom($query, $params)
    {
        $stmt = $this->connect()->prepare($query);
        $error = !$stmt->execute($params) ? 1 : 0;
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->GetResult($error, $data);
    }

    protected function DML($query, $params)
    {
        $stmt = $this->connect()->prepare($query);
        $error = !$stmt->execute($params) ? 1 : 0;
        return $this->GetResult($error);
    }

    protected function GetResult($error, $data = null)
    {
        return array(
            "error"=>$error,
            "data"=>$data,
            "msg"=> ""
        );
    }
}