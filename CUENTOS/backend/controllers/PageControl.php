<?php

class PageControl extends Page{
    private $bookid, $pageNumber, $userid, $pageContent, $uuid;

    public function __construct($uuid = null, $bookid = null, $pageNumber = null, $pageContent = null, $userid = null)
    {
        $this->uuid   = $uuid;
        $this->bookid = $bookid;
        $this->pageNumber = $pageNumber;
        $this->userid = $userid;
        $this->pageContent = $pageContent;
    }

    public function SetPageId($uuid) { $this->uuid = $uuid; }
    public function SetBookId($bookid) { $this->bookid = $bookid; }
    public function SetPageNumber($pageNumber) { $this->pageNumber = $pageNumber; }
    public function SetUserId($userid) { $this->userid = $userid; }
    public function SetPageContent($pageContent) { $this->pageContent = $pageContent; }

    public function GetPageId() { return $this->uuid; }
    public function GetBookId() { return $this->bookid; }
    public function GetPageNumber() { return $this->pageNumber; }
    public function GetUserId() { return $this->pageContent; }
    public function GetPageContent() { return $this->userid; }

    public function InsertNewPage()
    {
        return parent::InsertPage($this->uuid,$this->pageNumber,$this->bookid,$this->userid,$this->pageContent);
    }

    public function GetBookContent()
    {
        return parent::SelectBookContent($this->bookid);
    }
}