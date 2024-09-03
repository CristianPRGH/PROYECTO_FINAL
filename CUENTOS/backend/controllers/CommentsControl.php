<?php

class CommentsControl extends Comments
{
    private $bookid, $userid, $comment, $rating;

    public function __construct($bookid = null, $userid = null, $comment = null, $rating = null)
    {
        $this->bookid = $bookid;
        $this->userid = $userid;
        $this->comment = $comment;
        $this->rating = $rating;
    }

    public function SetBookId($bookid)
    {
        $this->bookid = $bookid;
    }
    public function SetPageId($userid)
    {
        $this->userid = $userid;
    }
    public function SetUserId($comment)
    {
        $this->comment = $comment;
    }
    public function SetPageContent($rating)
    {
        $this->rating = $rating;
    }

    public function GetBookId()
    {
        return $this->bookid;
    }
    public function GetUserId()
    {
        return $this->userid;
    }
    public function GetComment()
    {
        return $this->comment;
    }
    public function GetRating()
    {
        return $this->rating;
    }

    public function InsertNewComment()
    {
        return parent::InsertComment($this->bookid, $this->userid, $this->comment, $this->rating);
    }

    public function GetBookComments()
    {
        return parent::SelectBookComments($this->bookid);
    }
}
