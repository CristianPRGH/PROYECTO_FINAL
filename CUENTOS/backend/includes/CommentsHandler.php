<?php

require_once "myAutoload.php";

class CommentsHandler
{
    private $commentsControl;

    public function __construct()
    {
        $this->commentsControl  = new CommentsControl();
    }

    public function handleRequest()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = $_POST["action"] ?? null;

            switch ($action) {
                case "insertBookComment":
                    $this->insertNewComment();
                    break;
                case "getBookComments":
                    $this->getBookComments();
                    break;
                default:
                    echo json_encode(["error" => "Invalid action"]);
            }
        } else {
            echo json_encode(["error" => "Invalid request method"]);
        }
    }

    private function insertNewComment()
    {
        $bookid   = $_POST["bookid"] ?? null;
        $userid   = $_POST["userid"] ?? null;
        $comment  = $_POST["comment"] ?? null;
        $rating   = $_POST["rating"] ?? null;


        $this->commentsControl = new CommentsControl($bookid, $userid, $comment, $rating );
        $result = $this->commentsControl->InsertNewComment();
        $this->sendResponse($result);
    }

    private function getBookComments()
    {
        $bookid   = $_POST["bookid"] ?? null;

        $this->commentsControl = new CommentsControl($bookid);
        $result = $this->commentsControl->GetBookComments();
        $this->sendResponse($result);
    }

    private function sendResponse($data)
    {
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Uso de la clase
$handler = new CommentsHandler();
$handler->handleRequest();