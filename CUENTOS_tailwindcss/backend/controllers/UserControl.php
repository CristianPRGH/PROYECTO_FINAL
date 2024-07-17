<?php

class UserControl extends User{
    
    use TValidations;

    private $username;
    private $email;
    private $password;

    private $validations = array(
        "required"=>"ValidateEmpty",
        "email"=>"ValidateEmail",
        "checkemail"=>"CheckEmailExists",
        "username"=>"ValidateUsername",
        "checkusername"=>"CheckUsernameExists",
        "password"=>"ValidatePassword"
    );
    private $formValid = array();

    public function __construct($username = null, $email = null, $password = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function SetUsername($username) { $this->username = $username; }
    public function SetEmail($email) { $this->email = $email; }
    public function SetPassword($password) { $this->password = $password; }

    public function GetUsername() { return $this->username; }
    public function GetEmail() { return $this->email; }
    public function GetPassword() { return $this->password; }

    public function ValidaInputs($inputs)
    {
        // VALIDA LOS CAMPOS
        $datos = array();
        $values = array();
        $formIsValid = true;
        
        // print_r($this->inputs);
        foreach ($inputs as $input) {
            foreach ($this->validations as $key => $validation) {
                if (in_array($key, explode(' ', $input['classes'])) || strpos($input['id'], $key) !== false || $input['type'] === $key) {
                    
                    // Esto asegura que la función se llame en el contexto de la instancia actual de la clase ($this), permitiendo así el acceso a las funciones del trait.
                    $data = call_user_func_array([$this, $validation], [$input["value"]]);
                    $datos[$input['id']] = $data[1]; // [ID] = validmsg
                    if (!$data[0])  // is valid?
                    {
                        $formIsValid = false;
                        break; // Sale del bucle que busca las funciones de validacion para ir al siguiente input
                    }
                }
            }

            array_push($values, $input["value"]);
        }

        $code = $formIsValid ? 0 : 1;
        
        return array(
            "code"=>$code,
            "msg"=>"",//$msg
            "datos"=>$datos
        );
    }

    private function CheckUsernameExists($username)
    {
        if (strlen($username) > 0)
        {
            $result = parent::CheckUsername($username);
            if ($result["data"][0]["total_lines"] > 0)
            {
                $msg = "Usuario ya existe";
                return [false, $msg];
            }
            else{
                return [true, "valid"];
            }
        }

    }

    private function CheckEmailExists($email)
    {
        if (strlen($email) > 0)
        {
            $result = parent::CheckEmail($email);
            if ($result["data"][0]["total_lines"] > 0)
            {
                $msg = "Email ya existe";
                return [false, $msg];
            }
            else{
                return [true, "valid"];
            }
        }

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

    public function InsertUser($values)
    {
        return parent::InsertNewUser($values);
    }


    // private function CheckEmailExists($input)
    // {
    //     if (strlen($input["value"]) > 0 && parent::CheckEmail($input["value"])) {
    //         $msg = "Email ya existe";
    //         return [false, $input["id"], $msg];
    //     }

    //     return [true, $input["id"], "valid"];
    // }
}