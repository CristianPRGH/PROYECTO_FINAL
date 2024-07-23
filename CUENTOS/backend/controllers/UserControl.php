<?php

class UserControl extends User{
    
    use TValidations;

    private $formValid = array();
    private $username, $email, $password, $image;

    public function __construct($username = null, $email = null, $password = null, $image = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->image = $image;
    }

    public function SetUsername($username){ $this->username = $username; }
    public function SetEmail($email){ $this->email = $email; }
    public function SetPassword($password){ $this->password = $password; }
    public function SetImage($image){ $this->image = $image; }

    public function GetUsername(){ return $this->username; }
    public function GetEmail(){ return $this->email; }
    public function GetPassword(){ return $this->password; }
    public function GetImage(){ return $this->image; }

    public function ValidateUserInputs($inputs)
    {
        return $this->ValidaInputs($inputs);
    }

    // public function ValidaLogin($inputs)
    // {
    //     $username = $inputs[0]["value"];
    //     $password = $inputs[1]["value"];

    //     $result = parent::CheckLogin($username);

    //     if ($result["error"] == 0)
    //     {
    //         if (count($result["data"]) > 0)// $result[1]->rowCount() > 0)
    //         {
    //             $userPass = $result["data"][0]["password"];
    //             if (!password_verify($password, $userPass))
    //             {
    //                 $result["error"] = 1;
    //                 $result["msg"] = "Usuario o contraseña son incorrectos";
    //             }else{
    //                 $_SESSION["userid"] = $result["data"][0]["id"];
    //                 $_SESSION["username"] = $result["data"][0]["username"];
    //             }
    //         }
    //         else
    //         {
    //             $result["error"] = 1;
    //             $result["msg"] = "Usuario o contraseña son incorrectos";
    //         }
    //     }

    //     return $result;
    // }

    public function InsertNewUser()
    {
        $res = $this->SaveImage();
        if ($res[0])
            return parent::InsertUser([$this->username, $this->email, $this->password, $res[1]]);
    }

    public function CheckUsernameEmail()
    {
        $result = parent::CheckUsernameEmailExists($this->username, $this->email);
        if ($result["error"] == 2)
        {
            $result["msg"] = $this->username != null ? "El nombre de usuario ya existe" : "El email ya existe";
        }

        return $result;
    }

    private function ValidateUsernameExists($value = null)
    {
        if (strlen($this->username) > 0)
        {
            $result = $this->CheckUsernameEmail();
            $msg = $result["msg"];
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidateEmailExists($value = null)
    {
        if (strlen($this->email) > 0)
        {
            $result = $this->CheckUsernameEmail();
            $msg = $result["msg"];
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function SaveImage()
    {
        $userImagesFolder = "../../images/users_avatars/";
        $imgname = $this->image["name"];
        $tmpname = $this->image["tmp_name"];
        $namesplit = explode('.', $imgname);
        $imgext  = array_pop($namesplit);

        $imagenewname = $this->username."image";
        $imagenewname = password_hash($imagenewname, PASSWORD_DEFAULT);

        $fullpath = $userImagesFolder.$imagenewname.'.'.$imgext;

        if (!file_exists($fullpath))
        {
            // print_r([$tmpname,$fullpath]);

            if ( move_uploaded_file($tmpname, $fullpath))
            {
                return [true, $imagenewname];
            }
        }

        return [false, ""];
    }

    // public function GetUsersList()
    // {
    //     $result = $this->GetUsers();
    //     return $result; // -> LISTA DE USUARIOS
    // }
}