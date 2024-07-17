<?php

require "myAutoload.php";

$inputJSON = file_get_contents('php://input');
$inputs = json_decode($inputJSON, true);
$resultado = null;

$values = [];
for ($i=0; $i < count($inputs); $i++) { 
    array_push($values,$inputs[$i]["value"]);
}

// print_r($values);
$user = new UserControl();
$result = $user->InsertUser($values);
