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
    $cover      = $_FILES["cover"];
    $author     = $_SESSION["userid"];

    $book = new BookControl();
    $result = $user->InsertNewUser();

    header("Content-Type: application/json");
    echo json_encode($result);
}