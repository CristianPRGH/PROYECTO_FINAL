<?php

require "myAutoload.php";

$category = new CategoryControl();
$result = $category->GetAllCategories();

header("Content-Type: application/json");
echo json_encode($result);