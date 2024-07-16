<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $inputJSON = file_get_contents('php://input');
    $inputs = json_decode($inputJSON, true);
    $resultado = null;

    $user = new UserControl();
    $resultado = $user->ValidaInputs($inputs);

    // if ($resultado["code"] == 0)
    // {
    //     $values = [];
    //     for ($i=0; $i < count($inputs); $i++) { 
    //         array_push($values,$inputs[$i]["value"]);
    //     }

    //     // print_r($values);
    //     // $user->InsertUser($values);
    // }

    header("Content-Type: application/json");
    echo json_encode($resultado);
}