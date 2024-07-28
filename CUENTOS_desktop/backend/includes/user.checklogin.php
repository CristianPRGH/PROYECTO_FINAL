<?php

require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $username = $_POST["username"];
    $password = $_POST["password"];

    $user = new UserControl();
    $user->SetUsername($username);
    $user->SetPassword($password);
    $result = $user->ValidateLogin();

    header("Content-Type: application/json");
    echo json_encode($result);
}