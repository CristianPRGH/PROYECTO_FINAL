<?php
session_start();
require_once "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $title      = $_POST["title"];
    $sinopsis   = $_POST["sinopsis"];
    $category   = $_POST["category"] != -1 ? $_POST["category"] : null;
    $pages      = $_POST["pages"];
    $tags       = $_POST["tags"];
    $author     = $_SESSION["userid"];
    $cover      = isset($_FILES["cover"]) ? $_FILES["cover"] : null;

    $book = new BookControl($title,$sinopsis,$category,$pages,$tags,$cover,$author);
    $result = $book->InsertNewBook();

    header("Content-Type: application/json");
    echo json_encode($result);
}