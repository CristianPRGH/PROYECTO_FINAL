<?php

require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $value = $_POST["value"];   // email

    $user = new UserControl(null,$value);
    $result = $user->ValidateEmailExists();
    
    header("Content-Type: application/json");
    echo json_encode($result);
}
