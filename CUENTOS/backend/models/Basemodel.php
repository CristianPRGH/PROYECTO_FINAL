<?php

class Basemodel extends Database{

    protected function SelectAll($query, $params)
    {
        $stmt = $this->connect()->prepare($query);
        $error = !$stmt->execute($params) ? 1 : 0;
        $error = $stmt->rowCount() > 0 ? 0 : 2;
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $this->GetResult($error, $data);
    }

    protected function SelectOne($query, $params)
    {
        $stmt = $this->connect()->prepare($query);
        $error = !$stmt->execute($params) ? 1 : 0;
        $error = $stmt->rowCount() > 0 ? 0 : 2;
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $this->GetResult($error, $data);
    }

    protected function InsUpdDel($query, $params)
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