<?php

class Category extends Basemodel{
    private $table = "book_categories";

    protected function SelectAllCategories()
    {
        $query = "SELECT *, (min_pages + max_pages) / 2 AS avg_pages FROM $this->table";
        return parent::SelectAll($query);
    }
}