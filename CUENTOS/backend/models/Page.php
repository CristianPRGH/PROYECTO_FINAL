<?php

class Page extends Basemodel{
    private $table = "book_pages";

    protected function InsertPage($pageid, $bookid, $userid, $pageContent)
    {
        print_r([$pageid, $bookid, $userid, $pageContent]);
        $query = "UPDATE $this->table SET pg_content = ? WHERE id = ?, pg_bookid = ?, pg_authorid = ?";
        $resultUpdate = parent::InsUpdDel($query, [$pageContent, $pageid, $bookid, $userid]);
        print_r($resultUpdate);
        if ($resultUpdate["error"] == 0) return $resultUpdate;

        $query = "INSERT INTO $this->table (id, pg_bookid, pg_authorid, pg_content) VALUES (?,?,?,?)";
        return parent::InsUpdDel($query, [$pageid, $bookid, $userid, $pageContent]);
    }

    protected function SelectBookContent($bookid)
    {
        $query =
            "SELECT pages.* FROM $this->table AS pages
            JOIN users ON users.id = pages.pg_authorid
            WHERE pages.pg_bookid = ?";
        return parent::SelectAll($query, [$bookid]);
    }
}