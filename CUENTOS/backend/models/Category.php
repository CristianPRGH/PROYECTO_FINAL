<?php

class Category extends Basemodel{
    private $table = "categories";

    protected function SelectAllCategories()
    {
        $query = "SELECT *, (Min_pages + Max_pages) / 2 AS avg_pages
        FROM $this->table";
        return parent::SelectAll($query);
    }
}