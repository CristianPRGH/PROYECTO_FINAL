<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $values = [];
    for ($i=0; $i < count($inputs); $i++) { 
        array_push($values,$inputs[$i]["value"]);
    }

    // print_r($values);
    $user = new UserControl($username, $email, $password);
    $result = $user->InsertNewUser();

    header("Content-Type: application/json");
    echo json_encode($result);
}