<?php

class Page extends Basemodel{
    private $table = "book_pages";

    protected function InsertPage($pageid, $bookid, $userid, $pageContent)
    {
        $query = "INSERT INTO $this->table (id, pg_bookid, pg_authorid, pg_content) VALUES (?,?,?,?)";
        return parent::InsUpdDel($query, [$pageid,$bookid, $userid, $pageContent]);
    }
    protected function SelectBookContent($bookid)
    {
        $query =
            "SELECT pg_content, pg_authorid FROM $this->table AS pages
            JOIN users ON users.id = pages.pg_authorid
            WHERE pages.pg_bookid = ?";
        return parent::SelectAll($query, [$bookid]);
    }
}