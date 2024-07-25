<?php

class TagControl extends Tag{

    private $id;
    private $tag;

    public function __construct($tag = null)
    {
        $this->tag  = $tag;
    }

    public function SetId($id) { $this->id = $id; }
    public function SetTag($tag) { $this->tag = $tag; }

    public function GetId() { return $this->id; }
    public function GetTag() { return $this->tag; }

    public function GetAllTags()
    {
        return parent::SelectAllTags();
    }
}