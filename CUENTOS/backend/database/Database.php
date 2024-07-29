<?php

class Database extends Dbconfig{

    protected function connect()
    {
        $params = parent::GetConnectionParams();

        try {
            $dsn = 'mysql:host='.$params["host"].';dbname='.$params["name"];
            $con = new PDO($dsn,$params["user"],$params["pass"]);
            return $con;
        } catch (PDOException $e) {
            return "Error!: ". $e->getMessage()."<br>";
        }
    }
}