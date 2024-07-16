<?php

class Dbconfig{

    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $name = "cuentacuentos";

    protected function GetConnectionParams()
    {
        return [
            "host"=>$this->host,
            "user"=>$this->user,
            "pass"=>$this->pass,
            "name"=>$this->name
        ];
    }
}
