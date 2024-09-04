<?php

class Page extends Basemodel{
    private $table = "pages";

    protected function InsertPage($pageid, $pageNumber, $bookid, $userid, $pageContent)
    {
        //INTENTA MODIFICAR EL REGISTRO
        $query = "UPDATE $this->table 
        SET Content = ? 
        WHERE UIPage = ? AND UIBook = ? AND UIUser = ?";
        $resultUpdate = parent::UpdateRows($query, [$pageContent, $pageid, $bookid, $userid]);

        
        if ($resultUpdate["affectedRows"] > 0) { return $resultUpdate; }
        
        //SI NO SE HA MODIFICADO NINGÚN REGISTRO (YA SEA PORQUE NO EXISTE o PORQUE NO HA SUFRIDO UN CAMBIO), BUSCA SI EL REGISTRO YA EXISTE
        $query = "SELECT COUNT(*) as SelectedPage 
        FROM $this->table 
        WHERE UIPage = ? AND UIBook = ? AND UIUser = ?";
        $resultSelect = parent::SelectOne($query, [$pageid, $bookid, $userid]);
        
        // print_r($resultSelect);
        if ($resultSelect["data"]["SelectedPage"] == 0)
        {
            // SI EL REGISTRO NO EXISTE LO INSERTA
            $query = "INSERT INTO $this->table
            (UIPage, UIBook, UIUser, Content, PageNumber)
            VALUES (UUID(),?,?,?,?)";
            return parent::InsertRows($query, [$bookid, $userid, $pageContent, $pageNumber]);
        }
    }

    protected function SelectBookContent($bookid)
    {
        $query =
            "SELECT B.UIUser, P.*
            FROM $this->table AS P
            JOIN users U ON U.UIUser = P.UIUser
            JOIN books B ON P.UIBook = B.UIBook
            WHERE P.UIBook = ?";
        return parent::SelectAll($query, [$bookid]);
    }
}