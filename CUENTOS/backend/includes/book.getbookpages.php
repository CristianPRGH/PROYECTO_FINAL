<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["bookid"]))
{
    $bookid = $_POST["bookid"];
    $book = new BookControl();
    $book->SetId($bookid);
    $result = $book->GetBookPages();

    header("Content-Type: application/json");
    echo json_encode($result);
}