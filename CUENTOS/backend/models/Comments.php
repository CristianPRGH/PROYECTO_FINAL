<?php

class Comments extends Basemodel{
    private $table = "comments";

    protected function InsertComment($bookid,$userid,$comment,$rating)
    {
        $query = "INSERT INTO $this->table
            (UIBook,UIUser,Comment,Rating)
            VALUES (?,?,?,?)";
        
        return parent::InsertRows($query, [$bookid, $userid, $comment, $rating]);
    }

    protected function SelectBookComments($bookid)
    {
        $query = "SELECT U.Username, U.Image, C.Comment, C.Created_at
                FROM $this->table AS C
                JOIN users AS U ON C.UIUser = U.UIUser
                WHERE UIBook = ?";
        
        return parent::SelectAll($query, [$bookid]);
    }
}