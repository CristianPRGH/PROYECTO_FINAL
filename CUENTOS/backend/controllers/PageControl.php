<?php

class PageControl extends Page{
    private $bookid, $pageid, $userid, $pageContent;

    public function __construct($bookid = null, $pageid = null, $pageContent = null, $userid = null)
    {
        $this->bookid = $bookid;
        $this->pageid = $pageid;
        $this->userid = $userid;
        $this->pageContent = $pageContent;
    }

    public function SetBookId($bookid) { $this->bookid = $bookid; }
    public function SetPageId($pageid) { $this->pageid = $pageid; }
    public function SetUserId($userid) { $this->userid = $userid; }
    public function SetPageContent($pageContent) { $this->pageContent = $pageContent; }

    public function GetBookId() { return $this->bookid; }
    public function GetPageId() { return $this->pageid; }
    public function GetUserId() { return $this->pageContent; }
    public function GetPageContent() { return $this->userid; }

    public function InsertNewPage()
    {
        return parent::InsertPage($this->pageid,$this->bookid,$this->userid,$this->pageContent);
    }

    public function GetBookContent()
    {
        return parent::SelectBookContent($this->bookid);
    }
}