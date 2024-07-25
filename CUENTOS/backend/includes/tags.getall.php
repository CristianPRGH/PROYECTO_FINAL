<?php

require "myAutoload.php";

$category = new TagControl();
$result = $category->GetAllTags();

header("Content-Type: application/json");
echo json_encode($result);