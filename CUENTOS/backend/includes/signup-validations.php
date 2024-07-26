<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $inputs = json_decode($_POST['inputs'], true);

    if (isset($_FILES["imgfile"]))
    {
        $img = $_FILES["imgfile"];
        $inputs[3]["value"] = $img["size"];
    }

    $validations = new ValidationsControl();
    $result = $validations->ValidaInputs($inputs);

    header("Content-Type: application/json");
    echo json_encode($result);
}