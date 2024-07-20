<?php

class UserControl extends User{
    
    use TValidations;

    private $validations = array(
        "required"=>"ValidateEmpty",
        "email"=>"ValidateEmail",
        "username"=>"ValidateUsername",
        "password"=>"ValidatePassword"
    );
    private $formValid = array();

    private $username, $email, $password;

    public function __construct($username = null, $email = null, $password = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

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


        // $msg = $formIsValid  
        //         ? (!parent::SetUser($values) ? "Usuario ingresado correctamente" : "Error al ingresar al usuario")
        //         : "Formulario con errores";

        $code = $formIsValid ? 0 : 1;
        
        return array(
            "datos"=>$datos,
            "code"=>$code,
            "msg"=>""//$msg
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

    // public function InsertUser($values)
    // {
    //     parent::SetUser($values);
    // }

    public function CheckUsernameEmail()
    {
        $result = parent::CheckUsernameEmailExists($this->username, $this->email);
        if ($result["error"] == 2)
        {
            $result["msg"] = $this->username != null ? "El nombre de usuario ya existe" : "El email ya existe";
        }

        return $result;
    }

    // private function CheckUsernameExists($input)
    // {
    //     if (strlen($input["value"]) > 0 && parent::CheckUsername($input["value"])) {
    //         $msg = "Usuario ya existe";
    //         return [false, $input["id"], $msg];
    //     }

    //     return [true, $input["id"], "valid"];
    // }

    // private function CheckEmailExists($input)
    // {
    //     if (strlen($input["value"]) > 0 && parent::CheckEmail($input["value"])) {
    //         $msg = "Email ya existe";
    //         return [false, $input["id"], $msg];
    //     }

    //     return [true, $input["id"], "valid"];
    // }

    // public function GetUsersList()
    // {
    //     $result = $this->GetUsers();
    //     return $result; // -> LISTA DE USUARIOS
    // }
}