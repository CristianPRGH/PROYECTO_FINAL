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

    protected function SelectBooks()
    {
        $query = 
        "SELECT books.id, books.bk_title, books.bk_tags, books.bk_cover, users.username FROM $this->table AS books
        JOIN users ON users.id = books.bk_authorid";
        return parent::SelectAll($query);
    }
}