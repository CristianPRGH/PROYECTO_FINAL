<?php

require "myAutoload.php";

class BookInclude extends BookControl{
    private $Post;

    public function __construct()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") $this->Post = $_POST;
    }
}