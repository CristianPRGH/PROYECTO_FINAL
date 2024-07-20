<?php

class Book extends Basemodel{
    private $table = "books";

    public function __construct()
    {
        parent::SetTable($this->table);
    }
}