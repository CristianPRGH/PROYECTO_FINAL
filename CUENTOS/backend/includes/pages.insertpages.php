<?php
session_start();
require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $pagesData  = $_POST["pages"];
    $results    = array();

    foreach ($pagesData as $page)
    {
        $page = json_decode($page, true);
        $newpage = new PageControl($page["bookid"], $page["pageid"], json_encode($page["content"]) , $page["userid"]);
        $result  = $newpage->InsertNewPage();
        array_push($results, $result);
    }

    header("Content-Type: application/json");
    echo json_encode($results);
}