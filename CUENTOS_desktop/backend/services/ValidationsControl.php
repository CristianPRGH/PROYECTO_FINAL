<?php

// VALIDACIONES
class ValidationsControl {

    private $validations = array(
        "v_required"=>"ValidateEmpty",
        "v_name"=>"ValidateName",
        // "v_emailexists"=>"ValidateEmailExists",
        "v_emailformat"=>"ValidateEmail",
        // "v_usernameexists"=>"ValidateUsernameExists",
        "v_username"=>"ValidateUsername",
        "v_pwdformat"=>"ValidatePassword",
        "v_imgsize"=>"ValidateImageSize"
    );

    public function ValidaInputs($inputs)
    {
        // VALIDA LOS CAMPOS
        $validations = array();
        $values = array();
        $formIsValid = true;

        
        
        // print_r($inputs);
        foreach ($inputs as $input) {
            foreach ($this->validations as $key => $validation) {
                if (in_array($key, explode(' ', $input['validations']))) {
                    
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


    private function ValidateEmpty($value) {
        $valueValue = $value;
        if (empty($valueValue)) {
            $msg = "Campo vacío";
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidateName($value) {
        $regex = '/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]+(\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ-]+)*$/';
        $value = htmlspecialchars($value);

        if (strlen($value) > 0 && !preg_match($regex, $value)) {
            $msg = "Formato incorrecto.";
            return [false, $msg];
        }

        return [true, "valid"];
    }



    private function ValidateUsername($value) {
        $regex = '/^[a-z\d]+$/i';
        $value = htmlspecialchars($value);

        if (strlen($value) > 0 && !preg_match($regex, $value)) {
            $msg = "Formato incorrecto.";
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidateDNI($value) {
        $dniRegex = '/^(\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-Z])$/';
        $dniCompleto = strtoupper(trim($value));
        $dniCompleto = htmlspecialchars($dniCompleto);
        $letras = [
            "T","R","W","A","G","M","Y","F","P",
            "D","X","B","N","J","Z","S","Q","V",
            "H","L","C","K","E","T",
        ];

        if (!preg_match($dniRegex, $dniCompleto)) {
            $msg = "Número incorrecto.";
            return [false, $msg];
        }

        $primerDigito = substr($dniCompleto, 0, 1);
        $dniNumero = substr($dniCompleto, 0, 8);
        $dniLetra = substr($dniCompleto, 8, 1);
        $resultado = $dniNumero % 23;

        if (!is_numeric($primerDigito) && !in_array($primerDigito, ['X', 'Y', 'Z'])) {
            $msg = "Letra no válida";
            return [false, $msg];
        }

        if (is_numeric($primerDigito) && $dniLetra != $letras[$resultado]) {
            $msg = "Letra no válida";
            return [false, $msg];
        }

        if (!is_numeric($primerDigito)) {
            $letrasIniciales = ['X' => 0, 'Y' => 1, 'Z' => 2];
            $nieNumerico = str_replace(['X', 'Y', 'Z'], $letrasIniciales, $dniCompleto);
            $dniNumero = substr($nieNumerico, 0, 8);
            $dniLetra = substr($nieNumerico, 8, 1);
            $resultado = $dniNumero % 23;

            if ($dniLetra != $letras[$resultado]) {
                $msg = "Letra no válida";
                return [false, $msg];
            }
        }

        return [true, "valid"];
    }

    private function ValidateEmail($value) {
        $regexEmail = '/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/';
        $value = filter_var($value, FILTER_SANITIZE_EMAIL);

        if (strlen($value) > 0 && !preg_match($regexEmail, $value)) {
            $msg = "Formato no válido";
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidateDate($value) {
        $DATE_REGEX = '/^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/';
        $TODAY = new DateTime();
        $CURRENT_YEAR = $TODAY->format('Y');
        $CURRENT_MONTH = $TODAY->format('m');
        $CURRENT_DAY = $TODAY->format('d');

        $validDate = true;
        $msg = "";

        if (strlen($value) > 0) {
            $valoresFecha = explode('-', $value);
            $fechaFormateada = $valoresFecha[2] . '/' . $valoresFecha[1] . '/' . $valoresFecha[0];

            if (!preg_match($DATE_REGEX, $fechaFormateada)) {
                $msg = "Formato no válido";
                $validDate = false;
            }

            $day = (int) explode("/", $fechaFormateada)[0];
            $month = (int) explode("/", $fechaFormateada)[1];
            $year = (int) explode("/", $fechaFormateada)[2];
            $monthDays = (new DateTime("$year-$month-01"))->format('t');

            if ($day > $monthDays) {
                $msg = "Día no válido";
                $validDate = false;
            }

            if ($year > $CURRENT_YEAR) {
                $msg = "Año mayor al actual";
                $validDate = false;
            }

            $miFecha = new DateTime($value);
            $diffYear = $CURRENT_YEAR - $miFecha->format('Y');
            if ($diffYear < 18) {
                $msg = "Debe ser mayor de edad";
                $validDate = false;
            } else if ($diffYear == 18) {
                $diffMes = $CURRENT_MONTH - $miFecha->format('m');
                if ($diffMes != 0) {
                    $msg = "Debe ser mayor de edad";
                    $validDate = false;
                } else if ($diffMes == 0) {
                    $diffDias = $CURRENT_DAY - $miFecha->format('d');
                    if ($diffDias != 0) {
                        $msg = "Debe ser mayor de edad";
                        $validDate = false;
                    }
                }
            }
        }

        if ($validDate) {
            return [true, "valid"];
        } else {
            return [false, $msg];
        }
    }

    private function ValidateTel($value) {
        $telRegex = '/^(\+\d{1,3}\s?)?(\d{3,4}[-\s]?){2}\d{3,4}$/';
        $value = htmlspecialchars($value);

        if (strlen($value) > 0 && !preg_match($telRegex, $value)) {
            $msg = "Formato no válido";
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidatePassword($value) {
        $valor = $value;

        if (strlen($valor) > 0) {
            $level = 0;
            $level += (strlen($valor) > 5 && strlen($valor) < 13) ? 1 : 0;
            $level += (preg_match('/(?=(.*[!@#$%^&*(),.?":{}|<>]){2,})/', $valor)) ? 1 : 0;
            $level += (preg_match('/(?=(.*[a-z]){2,})/', $valor)) ? 1 : 0;
            $level += (preg_match('/(?=(.*[A-Z]){2,})/', $valor)) ? 1 : 0;
            $level += (preg_match('/(?=(.*\d){2,})/', $valor)) ? 1 : 0;

            if ($level < 5) {
                $msg = "No cumple los requisitos";
                return [false, $msg];
            }
        }

        return [true, "valid"];
    }

    private function ValidatePasswordRepeat($value, $pass2) {
        // $pass2 = $_POST[$value["dataset"]["repeat"]];

        if ($value != $pass2) {
            $msg = "Las contraseñas no coinciden";
            return [false, $msg];
        }

        return [true, "valid"];
    }

    private function ValidateImageSize($value)
    {
        $maxsize = 100;

        if (strlen($value) > 0)
        {
            $sizeMb = round(($value/1024));

            if ($sizeMb > $maxsize)
            {
                $msg = "La imagen debe ser menor a 1Mb";
                return [false, $msg];
            }
        }

        return [true, "valid"];
    }
}