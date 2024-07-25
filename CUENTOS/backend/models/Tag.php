<?php

class Tag extends Basemodel{
    private $table = "book_tags";

    protected function SelectAllTags()
    {
        $query = "SELECT tag FROM $this->table";
        return parent::SelectAll($query);
    }
}