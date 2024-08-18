<?php

require "myAutoload.php";

$book = new BookControl();
$result = $book->GetMostReadBooks();

header("Content-Type: application/json");
echo json_encode($result);
