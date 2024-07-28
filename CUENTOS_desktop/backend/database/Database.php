<?php

class Database extends Dbconfig{
    private $con;

    protected function connect()
    {
        $params = parent::GetConnectionParams();

        try {
            $dsn = 'mysql:host='.$params["host"].';dbname='.$params["name"];
            $this->con = new PDO($dsn,$params["user"],$params["pass"]);
            return $this->con;
        } catch (PDOException $e) {
            return "Error!: ". $e->getMessage()."<br>";
        }
    }

    protected function GetLastId()
    {
        return $this->con->insert_id;
    }
}