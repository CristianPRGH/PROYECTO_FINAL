<?php

class PageControl extends Page{
    private $bookid, $pageid, $userid, $pageContent;

    public function __construct($bookid, $pageid, $pageContent, $userid)
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
        return parent::InsertPage($this->bookid,$this->pageid,$this->userid,$this->pageContent);
    }
}