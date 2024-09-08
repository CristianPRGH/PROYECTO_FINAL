<?php

require_once "myAutoload.php";

class UserHandler
{
    private $userControl;

    public function __construct()
    {
        $this->userControl  = new UserControl();
    }

    public function handleRequest()
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = $_POST["action"] ?? null;

            switch ($action) {
                case "checkLogin":
                    $this->checkLogin();
                    break;
                case "checkEmail":
                    $this->checkEmail();
                    break;
                case "checkUsername":
                    $this->checkUsername();
                    break;
                case "getUserInfo":
                    $this->getUserInfo();
                    break;
                case "insertUser":
                    $this->insertUser();
                    break;
                case "getUserEmail":
                    $this->getUserEmail();
                    break;
                case "resetPassword":
                    $this->resetPassword();
                    break;
                case "logout":
                    $this->logout();
                    break;
                default:
                    echo json_encode(["error" => "Invalid action"]);
            }
        } else {
            echo json_encode(["error" => "Invalid request method"]);
        }
    }

    private function checkLogin()
    {
        $username = $_POST["username"];
        $password = $_POST["password"];

        $user = new UserControl();
        $user->SetUsername($username);
        $user->SetPassword($password);
        $result = $user->ValidateLogin();

        $this->sendResponse($result);
    }

    private function checkEmail()
    {
        $value = $_POST["value"];   // email

        $this->userControl->SetEmail($value);
        $result = $this->userControl->ValidateEmailExists();

        $this->sendResponse($result);
    }

    private function checkUsername()
    {
        $value = $_POST["value"];   // Username

        $this->userControl->SetUsername($value);
        $result = $this->userControl->ValidateUsernameExists();

        $this->sendResponse($result);
    }

    private function getUserInfo()
    {
        session_start();

        $userid = $_SESSION["userid"];
        $this->userControl->SetId($userid);
        $result = $this->userControl->GetUserInfo();

        $this->sendResponse($result);
    }

    private function insertUser()
    {
        $username   = $_POST["username"];
        $email      = $_POST["email"];
        $password   = $_POST["password"];
        $image      = $_FILES["image"];

        $this->userControl = new UserControl($username, $email, $password, $image);
        $result = $this->userControl->InsertNewUser();

        $this->sendResponse($result);
    }

    private function getUserEmail()
    {
        $value = $_POST["value"];
        $this->userControl->SetEmail($value);
        $this->userControl->SetUsername($value);
        $result = $this->userControl->GetUserEmail();

        $this->sendResponse($result);
    }

    private function resetPassword()
    {
        $password = $_POST["password"];
        $token = $_POST["token"];

        $this->userControl->SetPassword($password);
        $this->userControl->SetToken($token);
        $result = $this->userControl->ResetPassword();

        $this->sendResponse($result);
    }

    private function logout()
    {
        session_start();

        if (isset($_SESSION["userid"])) {
            session_destroy();
        }
    }

    private function sendResponse($data)
    {
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Uso de la clase
$handler = new UserHandler();
$handler->handleRequest();
