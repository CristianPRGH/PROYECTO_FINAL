<?php
session_start();
require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $bookid = $_POST["bookid"];
    $pages  = json_decode($_POST["content"]);
    $userid = $_SESSION["userid"];
    $results = array();
    
    foreach ($pages as $index=>$page)
    {
        $newpage = new PageControl($bookid, $index, json_encode($page) ,$userid);
        $result = $newpage->InsertNewPage();
        array_push($results, $result);
    }

    header("Content-Type: application/json");
    echo json_encode($results);
}