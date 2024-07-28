<?php
session_start();
require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $title      = $_POST["title"];
    $sinopsis   = $_POST["sinopsis"];
    $category   = $_POST["category"];
    $pages      = $_POST["pages"];
    $tags       = $_POST["tags"];
    $author     = $_SESSION["userid"];
    $cover      = null;
    
    if (isset($_FILES["cover"]))
        $cover = $_FILES["cover"];

    $book = new BookControl($title,$sinopsis,$category,$pages,$tags,$cover,$author);
    $result = $book->InsertNewBook();

    header("Content-Type: application/json");
    echo json_encode($result);
}