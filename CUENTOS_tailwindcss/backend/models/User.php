<?php

class User extends Basemodel{
    private $table = "users";

    public function __construct()
    {
        parent::SetTable($this->table);
    }
}