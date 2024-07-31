<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $bookid = $_POST["bookid"];
    $book = new BookControl();
    $book->SetId($bookid);
    $result = $book->GetBookById();

    header("Content-Type: application/json");
    echo json_encode($result);
}