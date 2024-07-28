<?php

require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $value = $_POST["value"];   // Username

    $user = new UserControl($value, null);
    $result = $user->ValidateUsernameExists();

    header("Content-Type: application/json");
    echo json_encode($result);
}
