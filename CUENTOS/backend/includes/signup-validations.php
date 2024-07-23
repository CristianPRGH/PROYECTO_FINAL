<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    // $inputJSON = file_get_contents('php://input');
    // print_r($inputJSON);
    // $inputs = json_decode($inputJSON, true);
    // print_r($inputs);

    $inputs = json_decode($_POST['inputs'], true);
    $img = $_FILES["imgfile"];

    $inputs[3]["value"] = $img["size"];

    $user = new UserControl();
    $result = $user->ValidateUserInputs($inputs);

    header("Content-Type: application/json");
    echo json_encode($result);
}