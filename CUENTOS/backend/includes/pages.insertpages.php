<?php
session_start();
require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $bookid = $_POST["bookid"];
    $pages  = json_decode($_POST["content"]);
    $userid = $_SESSION["userid"];

    
//     foreach ($pages as $page) {
//         $newpage = new PageControl($bookid
// $pages 
// $userid);
//     }
}