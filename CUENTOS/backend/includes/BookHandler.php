<?php

require_once "myAutoload.php";

class BookHandler
{
    private $book;
    private $pages;

    public function __construct()
    {
        $this->book  = new BookControl();
        $this->pages = new PageControl();
    }

    public function handleRequest()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = $_POST["action"] ?? null;

            switch ($action) {
                case "getBookById":
                    $this->getBookById();
                    break;
                case "getBookContent":
                    $this->getBookContent();
                    break;
                case "getBookPages":
                    $this->getBookPages();
                    break;
                case "getBooksByFilters":
                    $this->getBooksByFilters();
                    break;
                case "getBooksList":
                    $this->getBooksList();
                    break;
                case "getMostReadBooks":
                    $this->getMostReadBooks();
                    break;
                case "insertNewBook":
                    $this->insertNewBook();
                    break;
                case "updateViews":
                    $this->updateViews();
                    break;
                case "getBooksByUser":
                    $this->getBooksByUser();
                    break;
                default:
                    echo json_encode(["error" => "Invalid action"]);
            }
        } else {
            echo json_encode(["error" => "Invalid request method"]);
        }
    }

    private function getBookById()
    {
        $bookid = $_POST["bookid"] ?? null;
        if ($bookid) {
            $this->book->SetId($bookid);
            $result = $this->book->GetBookById();
            $this->sendResponse($result);
        } else {
            $this->sendResponse(["error" => "Book ID not provided"]);
        }
    }

    private function getBookContent()
    {
        $bookid = $_POST["bookid"] ?? null;
        if ($bookid) {
            $this->pages->SetBookId($bookid);
            $result = $this->pages->GetBookContent();
            $this->sendResponse($result);
        } else {
            $this->sendResponse(["error" => "Book ID not provided"]);
        }
    }

    private function getBookPages()
    {
        $bookid = $_POST["bookid"] ?? null;
        if ($bookid) {
            $this->book->SetId($bookid);
            $result = $this->book->GetBookPages();
            $this->sendResponse($result);
        } else {
            $this->sendResponse(["error" => "Book ID not provided"]);
        }
    }

    private function getBooksByFilters()
    {
        $name = $_POST["name_author"] ?? null;
        $tags = $_POST["tags"] ?? null;

        $this->book->SetTitle($name);
        $this->book->SetTags($tags);
        $result = $this->book->GetBooksByFilters();
        $this->sendResponse($result);
    }

    private function getBooksList()
    {
        $result = $this->book->GetBooksList();
        // print_r($result);
        $this->sendResponse($result);
    }

    private function getMostReadBooks()
    {
        $result = $this->book->GetMostReadBooks();
        $this->sendResponse($result);
    }

    private function insertNewBook()
    {
        session_start();

        $title = $_POST["title"] ?? null;
        $sinopsis = $_POST["sinopsis"] ?? null;
        $category = $_POST["category"] != -1 ? $_POST["category"] : null;
        $pages = $_POST["pages"] ?? null;
        $tags = $_POST["tags"] ?? null;
        $author = $_SESSION["userid"] ?? null;
        $cover = $_FILES["cover"] ?? null;

        $this->book = new BookControl($title, $sinopsis, $category, $pages, $tags, $cover, $author);
        $result = $this->book->InsertNewBook();
        $this->sendResponse($result);
    }

    private function updateViews()
    {
        $bookid = $_POST["bookid"] ?? null;
        if ($bookid) {
            $this->book->SetId($bookid);
            $this->book->UpdateViews();
            $this->sendResponse(["success" => "Views updated"]);
        } else {
            $this->sendResponse(["error" => "Book ID not provided"]);
        }
    }

    private function getBooksByUser()
    {
        $userid = $_POST["userid"] ?? null;
        if ($userid) {
            $this->book->SetAuthor($userid);
            $result = $this->book->GetBooksByUser();
            $this->sendResponse($result);
        } else {
            $this->sendResponse(["error" => "User ID not provided"]);
        }
    }

    private function sendResponse($data)
    {
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Uso de la clase
$handler = new BookHandler();
$handler->handleRequest();
