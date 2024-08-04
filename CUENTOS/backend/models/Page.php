<?php

class Page extends Basemodel{
    private $table = "book_pages";

    protected function InsertPage($pageid, $bookid, $userid, $pageContent)
    {
        //INTENTA MODIFICAR EL REGISTRO
        $query = "UPDATE $this->table SET pg_content = ? WHERE id = ? AND pg_bookid = ? AND pg_authorid = ?";
        $resultUpdate = parent::UpdateRows($query, [$pageContent, $pageid, $bookid, $userid]);

        if ($resultUpdate["affectedRows"] > 0) { return $resultUpdate; }

        //SI NO SE HA MODIFICADO NINGÚN REGISTRO (YA SEA PORQUE NO EXISTE o PORQUE NO HA SUFRIDO UN CAMBIO), BUSCA SI EL REGISTRO YA EXISTE
        $query = "SELECT COUNT(*) as SelectedPage FROM $this->table WHERE id = ? AND pg_bookid = ? AND pg_authorid = ?";
        $resultSelect = parent::SelectOne($query, [$pageid, $bookid, $userid]);

        if ($resultSelect["data"]["SelectedPage"] == 0)
        {
            // SI EL REGISTRO NO EXISTE LO INSERTA
            $query = "INSERT INTO $this->table (id, pg_bookid, pg_authorid, pg_content) VALUES (?,?,?,?)";
            return parent::InsertRows($query, [$pageid, $bookid, $userid, $pageContent]);
        }
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