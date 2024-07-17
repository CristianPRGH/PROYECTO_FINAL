<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $inputJSON = file_get_contents('php://input');
    $inputs = json_decode($inputJSON, true);
    $resultado = null;

    $user = new UserControl();
    $resultado = $user->ValidaInputs($inputs);

    header("Content-Type: application/json");
    echo json_encode($resultado);
}