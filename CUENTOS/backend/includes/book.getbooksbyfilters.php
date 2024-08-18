<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name_author"];
    $tags = $_POST["tags"];

    $book = new BookControl();
    $book->SetTitle($name);
    // $book->SetAuthor($name);
    $book->SetTags($tags);
    
    $result = $book->GetBooksByFilters();

    header("Content-Type: application/json");
    echo json_encode($result);
}