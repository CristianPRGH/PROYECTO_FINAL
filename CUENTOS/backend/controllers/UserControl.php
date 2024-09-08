<?php

class UserControl extends User{

    use SaveImages;

    private $formValid = array();
    private $id, $username, $email, $password, $image, $token;
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
    public function SetToken($token){ $this->token = $token; }

    public function GetId(){ return $this->id; }
    public function GetUsername(){ return $this->username; }
    public function GetEmail(){ return $this->email; }
    public function GetPassword(){ return $this->password; }
    public function GetImage(){ return $this->image; }
    public function GetToken(){ return $this->token; }




    // PUBLIC METHODS ----------------------------------------------------------------------

    // public function ValidateUserInputs($inputs)
    // {
    //     return $this->ValidaInputs($inputs);
    // }

    public function ValidateLogin()
    {
        $result = parent::CheckLogin($this->username, $this->password);

        if ($result["error"] == 0) {
            $hashedpwd = $result["data"]["password"];

            if (!password_verify($this->password, $hashedpwd)) {
                $result["error"] = 1;
                $result["msg"] = "Usuario o contraseña no válidos";
                return $result;
            } else {
                session_start();
                $_SESSION["userid"]   = $result["data"]["UIUser"];
                $_SESSION["username"] = $this->username;
                $result["error"] = 0;
                return $result;
            }
        } else {
            $result["error"] = 1;
            $result["msg"] = "Usuario o contraseña no válidos";
            return $result;
        }
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

    public function GetUserEmail()
    {
        $resultUserData = parent::SelectUserEmail($this->username, $this->email);
        if ($resultUserData["error"] == 2)
        {
            $resultUserData["msg"] = "Usuario o email no encontrado";
            return $resultUserData;
        }
        else
        {
            return $this->SendResetPasswordEmail($resultUserData);
        }
    }

    private function SendResetPasswordEmail($resultUserData)
    {
        $this->SetUsername($resultUserData["data"]["Username"]);
        $this->SetEmail($resultUserData["data"]["Email"]);
        $this->SetId($resultUserData["data"]["UIUser"]);

        $resultTokenGenerated = parent::GenerateUserToken($this->id);

        if ($resultTokenGenerated["affectedRows"] > 0) {
            $resultUserToken = parent::SelectUserToken($this->id);

            if ($resultUserToken["error"] == 0) 
            {
                $this->SetToken($resultUserToken["data"]["Token"]);
                $subject = 'Recuperación de contraseña';
                $emailBody = '<a href="http://localhost/MySites/PROYECTO_FINAL/CUENTOS/view/passwordRecover.php?token=' . $this->token . '">Pulse aquí para cambiar la contraseña</a>';

                $sender = new EmailSender();
                return $sender->sendEmailHandler($this->email, $this->username, $emailBody, $subject);
            }
        }
    }

    public function ResetPassword()
    {
        return parent::UpdateUserPassword($this->token, $this->password);
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
}