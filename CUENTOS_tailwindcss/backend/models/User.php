<?php

class User extends Basemodel{
    private $table = "users";

    public function __construct()
    {
        parent::SetTable($this->table);
    }

    protected function InsertNewUser($values)
    {
        // print_r($values);
        $query = "INSERT INTO $this->table (username, email, password) VALUES (?,?,?)";
        $hashPassword = password_hash($values[2], PASSWORD_DEFAULT);
        $values[2] = $hashPassword;

        return parent::DML($query, $values);
    }

    protected function CheckUsername($username)
    {
        $query = "SELECT COUNT(*) as total_lines FROM $this->table WHERE username = ?";
        return parent::FindCustom($query, [$username]);
    }

    protected function CheckEmail($email)
    {
        $query = "SELECT COUNT(*) as total_lines FROM $this->table WHERE email = ?";
        return parent::FindCustom($query, [$email]);
    }

}