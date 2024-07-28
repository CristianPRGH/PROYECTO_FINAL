<?php

class Page extends Basemodel{
    private $table = "pages";

    public function __construct()
    {
        parent::SetTable($this->table);
    }
}