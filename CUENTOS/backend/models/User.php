<?php

class User extends Basemodel{
    private $table = "users";

    protected function CheckUsernameEmailExists($username, $email)
    {
        $query = "SELECT username 
        FROM $this->table 
        WHERE username = ? OR email = ?";
        return parent::SelectOne($query, [$username, $email]);
    }

    protected function InsertUser($values)
    {
        $query = "INSERT INTO $this->table 
        (UIUser,username, email, password, image) 
        VALUES (UUID(),?,?,?,?)";
        $values[2] = password_hash($values[2], PASSWORD_DEFAULT);
        return parent::InsertRows($query, $values);
    }

    protected function CheckLogin($username, $password)
    {
        $query = "SELECT UIUser, password 
        FROM $this->table 
        WHERE username = ?";

        return parent::SelectOne($query, [$username]);
    }

    protected function SelectUserInfo($id)
    {
        $query = "SELECT 
        U.*,
        COUNT(DISTINCT B.UIBook) AS AuthorOfBooks,
        COUNT(DISTINCT CASE 
            WHEN B2.UIUser IS NULL THEN P.UIBook 
            END) AS CoauthorOfBooks
        FROM users U
        LEFT JOIN books B ON U.UIUser = B.UIUser
        LEFT JOIN pages P ON U.UIUser = P.UIUser
        LEFT JOIN books B2 ON P.UIBook = B2.UIBook AND B2.UIUser = U.UIUser
        WHERE U.UIUser = ?
        GROUP BY U.UIUser;";

        return parent::SelectOne($query, [$id]);
    }

    /* FUNCIONES PARA RECUPERAR CONTRASEÑA */
    protected function SelectUserEmail($username, $email)
    {
        $query = "SELECT UIUser, Username, Email
        FROM users
        WHERE Username = ? OR Email = ?";

        return parent::SelectOne($query, [$username, $email]);
    }

    protected function GenerateUserToken($values)
    {
        $query = "UPDATE $this->table
        SET Token = UUID(), Token_created_at = CURRENT_TIMESTAMP()
        WHERE UIUser = ?";

        return parent::UpdateRows($query, [$values]);
    }

    protected function SelectUserToken($id)
    {
        $query = "SELECT Token
        FROM $this->table
        WHERE UIUser = ?";

        return parent::SelectOne($query, [$id]);
    }

    protected function UpdateUserPassword($token, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $query = "UPDATE $this->table
        SET Password = ?
        WHERE Token = ?";

        $result = parent::UpdateRows($query, [$hashedPassword, $token]);

        if ($result["affectedRows"] > 0)
        {
            $query = "UPDATE $this->table
            SET Token = NULL, Token_created_at = NULL
            WHERE Token = ?";

            return parent::UpdateRows($query, [$token]);
        }
        else{
            return $result;
        }
    }

}