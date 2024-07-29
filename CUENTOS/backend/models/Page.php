<?php

class Page extends Basemodel{
    private $table = "book_pages";

    protected function InsertPage($bookid, $pageid, $userid, $pageContent)
    {
        $query = "INSERT INTO $this->table (id, pg_bookid, pg_authorid, pg_content) VALUES (?,?,?,?)";
        return parent::InsUpdDel($query, [$bookid, $pageid, $userid, $pageContent]);
    }
}