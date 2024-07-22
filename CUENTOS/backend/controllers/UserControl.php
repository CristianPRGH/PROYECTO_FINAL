<?php

class UserControl extends User{
    
    use TValidations;

    private $validations = array(
        "v_required"=>"ValidateEmpty",
        "v_emailexists"=>"ValidateEmailExists",
        "v_emailformat"=>"ValidateEmail",
        "v_usernameexists"=>"ValidateUsernameExists",
        "v_username"=>"ValidateUsername",
        "v_pwdformat"=>"ValidatePassword"
    );
    private $formValid = array();

    private $username, $email, $password;

    public function __construct($username = null, $email = null, $password = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function SetUsername($username){ $this->username = $username; }
    public function SetEmail($email){ $this->email = $email; }
    public function SetPassword($password){ $this->password = $password; }

    public function GetUsername(){ return $this->username; }
    public function GetEmail(){ return $this->email; }
    public function GetPassword(){ return $this->password; }

    public function ValidaInputs($inputs)
    {
        // VALIDA LOS CAMPOS
        $validations = array();
        $values = array();
        $formIsValid = true;
        
        // print_r($this->inputs);
        foreach ($inputs as $input) {
            foreach ($this->validations as $key => $validation) {
                if (in_array($key, explode(' ', $input['classes']))) {
                    
                    // Esto asegura que la función se llame en el contexto de la instancia actual de la clase ($this), permitiendo así el acceso a las funciones del trait.
                    $data = call_user_func_array([$this, $validation], [$input["value"]]);
                    $validations[$input['id']] = $data[1]; // [ID] = validmsg
                    if (!$data[0])  // is valid?
                    {
                        $formIsValid = false;
                        break; // Sale del bucle que busca las funciones de validacion para ir al siguiente input
                    }
                }
            }

            array_push($values, $input["value"]);
        }

        $error = $formIsValid ? 0 : 1;
        
        return array(
            "inputs"=>$validations,
            "error"=>$error
        );
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
        return parent::InsertUser([$this->username, $this->email, $this->password]);
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

    // public function GetUsersList()
    // {
    //     $result = $this->GetUsers();
    //     return $result; // -> LISTA DE USUARIOS
    // }
}