<?php

class User extends Basemodel{
    private $table = "users";

    protected function CheckUsernameEmailExists($username, $email)
    {
        $query = "SELECT username FROM $this->table WHERE username = ? OR email = ?";
        return parent::SelectOne($query, [$username, $email]);
    }
}