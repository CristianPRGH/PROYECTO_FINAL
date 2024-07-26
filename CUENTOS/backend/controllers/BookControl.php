<?php

class BookControl extends Book{
    use SaveImages;

    private $id,$title,$sinopsis,$category,$pages,$tags,$cover,$author;
    private $imagesFolder = "../../images/books_covers/";
    private $imagesPrefix = $this->title;

    public function SetId($id){ $this->id = $id; }
    public function SetTitle($title){ $this->title = $title; }
    public function SetSinopsis($sinopsis){ $this->sinopsis = $sinopsis; }
    public function SetCategory($category){ $this->category = $category; }
    public function SetPages($pages){ $this->pages = $pages; }
    public function SetTags($tags){ $this->tags = $tags; }
    public function SetCover($cover){ $this->cover = $cover; }
    public function SetAuthor($author){ $this->author = $author; }

    public function GetId(){ return $this->id; }
    public function GetTitle(){ return $this->title; }
    public function GetSinopsis(){ return $this->sinopsis; }
    public function GetCategory(){ return $this->category; }
    public function GetPages(){ return $this->pages; }
    public function GetTags(){ return $this->tags; }
    public function GetCover(){ return $this->cover; }
    public function GetAuthor(){ return $this->author; }

    public function InsertNewBook()
    {
        $res = $this->SaveImage($this->imagesFolder, $this->cover, $this->imagesPrefix);
        if ($res[0])
            return parent::InsertBook([$this->title, $this->sinopsis,$this->pages, $this->category,$this->tags, $res[1]], $this->author);
    }

}