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
        $values[2] = password_hash($values[2], PASSWORD_DEFAULT);
        return parent::InsUpdDel($query, $values);
    }

    protected function CheckLogin($username, $password)
    {
        $query = "SELECT id, password FROM $this->table WHERE username = ?";
        $result = parent::SelectOne($query, [$username]);

        if ($result["error"] == 0)
        {
            $hashedpwd = $result["data"]["password"];

            if (!password_verify($password, $hashedpwd))
            {
                return [false, "Usuario o contraseña no válidos"];
            }
            else{
                session_start();
                $_SESSION["userid"]   = $result["data"]["id"];
                $_SESSION["username"] = $username;
                return [true, ""];
            }
        }
        else{
            return [false, "Usuario o contraseña no válidos"];
        }
    }
}