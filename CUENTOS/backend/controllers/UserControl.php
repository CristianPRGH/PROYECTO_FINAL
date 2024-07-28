<?php

class UserControl extends User{
    
    // use TValidations;
    use SaveImages;

    private $formValid = array();
    private $id, $username, $email, $password, $image;
    private $imagesFolder = "../../images/users_avatars/";

    public function __construct($username = null, $email = null, $password = null, $image = null, $id = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->image = $image;
        $this->id = $id;
    }


    // GETTERS / SETTERS ----------------------------------------------------------------------

    public function SetId($id){ $this->id = $id; }
    public function SetUsername($username){ $this->username = $username; }
    public function SetEmail($email){ $this->email = $email; }
    public function SetPassword($password){ $this->password = $password; }
    public function SetImage($image){ $this->image = $image; }

    public function GetId(){ return $this->id; }
    public function GetUsername(){ return $this->username; }
    public function GetEmail(){ return $this->email; }
    public function GetPassword(){ return $this->password; }
    public function GetImage(){ return $this->image; }




    // PUBLIC METHODS ----------------------------------------------------------------------

    // public function ValidateUserInputs($inputs)
    // {
    //     return $this->ValidaInputs($inputs);
    // }

    public function ValidateLogin()
    {
        return parent::CheckLogin($this->username, $this->password);
    }

    public function InsertNewUser()
    {
        $imagesPrefix = $this->username;
        $res = $this->SaveImage($this->imagesFolder, $this->image, $imagesPrefix);
        if ($res[0])
            return parent::InsertUser([$this->username, $this->email, $this->password, $res[1]]);
    }


    public function ValidateUsernameExists()
    {
        return $this->CheckUsernameEmail();
    }

    public function ValidateEmailExists()
    {
        return $this->CheckUsernameEmail();
    }

    public function GetUserInfo()
    {
        return parent::SelectUserInfo($this->id);
    }


    // PRIVATE METHODS ----------------------------------------------------------------------


    private function CheckUsernameEmail()
    {
        $result = parent::CheckUsernameEmailExists($this->username, $this->email);
        if ($result["error"] == 0 && count($result["data"]) > 0)
        {
            $result["msg"] = $this->username != null ? "El nombre de usuario ya existe" : "El email ya existe";
        }

        return $result;
    }

    // private function SaveImage()
    // {
    //     $userImagesFolder = "../../images/users_avatars/";

    //     // Verifica si el directorio existe, si no, créalo
    //     if (!is_dir($userImagesFolder)) {
    //         if (!mkdir($userImagesFolder, 0777, true)) {
    //             return [false, ""]; // Falló al crear el directorio
    //         }
    //     }

    //     $imgname = $this->image["name"];
    //     $tmpname = $this->image["tmp_name"];
    //     $namesplit = explode('.', $imgname);
    //     $imgext    = array_pop($namesplit);

    //     $imagenewname = $this->username."image";
    //     $imagenewname = hash('sha256', $imagenewname).'.'.$imgext;

    //     $fullpath = $userImagesFolder.$imagenewname;

    //     // Verifica si el archivo temporal existe
    //     if (!file_exists($tmpname)) {
    //         error_log("Temp file does not exist: $tmpname");
    //         return [false, ""];
    //     }

    //     if (move_uploaded_file($tmpname, $fullpath)) {
            
    //         print_r($imagenewname);
    //         return [true, $imagenewname];
    //     } else {
    //         error_log("Failed to move uploaded file");
    //     }

    //     return [false, ""];
    // }
}