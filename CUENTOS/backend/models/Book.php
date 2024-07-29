<?php

class Book extends Basemodel{
    private $table = "books";

    protected function InsertBook($values)
    {
        $query = "INSERT INTO $this->table (bk_title, bk_sinopsis, bk_pages, bk_categoryid, bk_tags, bk_cover, bk_authorid) VALUES (?,?,?,?,?,?,?)";
        return parent::InsUpdDel($query, $values);
    }

    protected function SelectBookPages($id)
    {
        $query = "SELECT bk_pages as pages FROM $this->table WHERE id = ?";
        return parent::SelectOne($query, [$id]);
    }
}