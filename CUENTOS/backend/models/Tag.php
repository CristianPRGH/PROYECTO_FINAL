<?php

class Tag extends Basemodel{
    private $table = "tags";

    protected function SelectAllTags()
    {
        $query = "SELECT Name 
        FROM $this->table";
        return parent::SelectAll($query);
    }
}