<?php

require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $username   = $_POST["username"];
    $email      = $_POST["email"];
    $password   = $_POST["password"];
    $image      = $_FILES["image"];

    $user = new UserControl($username, $email, $password, $image);
    $result = $user->InsertNewUser();

    header("Content-Type: application/json");
    echo json_encode($result);
}