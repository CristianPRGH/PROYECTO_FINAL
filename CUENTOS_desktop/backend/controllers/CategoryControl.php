<?php

class CategoryControl extends Category{

    private $id;
    private $category;
    private $minpages;
    private $maxpages;
    
    public function __construct($category = null, $minpages = null, $maxpages = null)
    {
        $this->category  = $category;
        $this->$minpages = $minpages;
        $this->$maxpages = $maxpages;
    }

    public function SetId($id) { $this->id = $id; }
    public function SetCategory($category) { $this->category = $category; }
    public function SetMinPages($minpages) { $this->minpages = $minpages; }
    public function SetMaxPages($maxpages) { $this->maxpages = $maxpages; }

    public function GetId() { return $this->id; }
    public function GetCategory() { return $this->category; }
    public function GetMinPages() { return $this->minpages; }
    public function GetMaxPages() { return $this->maxpages; }

    public function GetAllCategories()
    {
        return parent::SelectAllCategories();
    }
}