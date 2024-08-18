<?php

require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $bookid = $_POST["bookid"];
    $book = new BookControl();
    $book->SetId($bookid);
    $book->UpdateViews();
}