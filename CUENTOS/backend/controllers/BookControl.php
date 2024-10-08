<?php

class BookControl extends Book{
    use SaveImages;

    private $id,$title,$sinopsis,$category,$pages,$tags,$cover,$author;
    private $imagesFolder = "../../images/books_covers/";
    
    public function __construct($title = null, $sinopsis = null, $category = null,$pages = null,$tags = null,$cover = null,$author = null)
    {
        $this->title = $title;
        $this->sinopsis = $sinopsis;
        $this->category = $category;
        $this->pages = $pages;
        $this->tags = $tags;
        $this->cover = $cover;
        $this->author = $author;
    }

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
        if ($this->cover != null)
        {
            $imagesPrefix = $this->title;
            $res = $this->SaveImage($this->imagesFolder, $this->cover, $imagesPrefix);
            $this->cover = $res[1];
        }

        return parent::InsertBook([$this->title, $this->sinopsis, $this->pages, $this->category, $this->tags, $this->cover, $this->author]);
    }

    public function GetBookPages()
    {
        return parent::SelectBookPages($this->id);
    }

    public function GetBooksList()
    {
        return parent::SelectBooks();
    }

    public function GetMostReadBooks()
    {
        return parent::SelectMostReadBooks();
    }

    public function GetBookById()
    {
        return parent::SelectBookById($this->id);
    }

    public function GetBookCoauthors()
    {
        return parent::SelectBookCoauthors($this->id);
    }

    public function GetBooksByFilters()
    {
        return parent::SelectBooksByFilters($this->title, $this->tags);
    }

    public function UpdateViews()
    {
        parent::UpdateBookViews($this->id);
    }

    public function GetBooksByUser()
    {
        return parent::SelectBooksByuser($this->author);
    }

    public function DeleteBookById()
    {
        return parent::DeleteBook($this->id);
    }

    public function UpdateBookById()
    {
        if ($this->cover != null && gettype($this->cover) === "array")
        {
            $imagesPrefix = $this->title;
            $res = $this->SaveImage($this->imagesFolder, $this->cover, $imagesPrefix);
            $this->cover = $res[1];
        }else if($this->cover === "NULL")
        {
            $this->cover = null;
        }
        
        return parent::UpdateBook([$this->title, $this->sinopsis, $this->pages, $this->category, $this->tags, $this->cover, $this->author, $this->id]);
    }
}