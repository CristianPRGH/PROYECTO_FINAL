<?php

class Page extends Basemodel{
    private $table = "book_pages";

    protected function InsertPage($pageid, $bookid, $userid, $pageContent)
    {
        $query = "INSERT INTO $this->table (id, pg_bookid, pg_authorid, pg_content) VALUES (?,?,?,?)";
        return parent::InsUpdDel($query, [$pageid,$bookid, $userid, $pageContent]);
    }
}