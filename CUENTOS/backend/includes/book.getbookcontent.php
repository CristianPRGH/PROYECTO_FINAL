<?php

require "myAutoload.php";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["bookid"])) {
    $bookid = $_POST["bookid"];
    $pages = new PageControl();
    $pages->SetBookId($bookid);
    $result = $pages->GetBookContent();

    header("Content-Type: application/json");
    echo json_encode($result);
}