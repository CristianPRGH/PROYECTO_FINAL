<?php

session_start();
require "myAutoload.php";

$userid = $_SESSION["userid"];
$user = new UserControl();
$user->SetId($userid);
$result = $user->GetUserInfo();

header("Content-Type: application/json");
echo json_encode($result);