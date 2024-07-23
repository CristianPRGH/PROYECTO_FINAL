<?php

class User extends Basemodel{
    private $table = "users";

    protected function CheckUsernameEmailExists($username, $email)
    {
        $query = "SELECT username FROM $this->table WHERE username = ? OR email = ?";
        return parent::SelectOne($query, [$username, $email]);
    }

    protected function InsertUser($values)
    {
        $query = "INSERT INTO $this->table (username, email, password, image) VALUES (?,?,?,?)";
        $values[2] = password_hash($values[1], PASSWORD_DEFAULT);
        return parent::InsUpdDel($query, $values);
    }
}