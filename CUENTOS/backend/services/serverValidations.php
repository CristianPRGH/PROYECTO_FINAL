<?php

require "../includes/myAutoload.php";

class RequestHandler {
    
    private $validations;

    public function __construct() {
        $this->validations = new ValidationsControl();
    }

    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $inputs = $this->getInputsFromPost();
            $this->updateInputWithFileSize($inputs, 'imgfile');
            $result = $this->validateInputs($inputs);
            $this->sendJsonResponse($result);
        } else {
            $this->sendJsonResponse(['error' => 'Invalid request method']);
        }
    }

    private function getInputsFromPost() {
        return json_decode($_POST['inputs'], true);
    }

    private function updateInputWithFileSize(&$inputs) {
        if (isset($_FILES["imgfile"]))
        {
            $fileSize = $_FILES["imgfile"]['size'];
            foreach ($inputs as &$input) {
                if (isset($input['type']) && $input['type'] === "file") {
                    $input['value'] = $fileSize;
                    break;
                }
            }
        }
    }

    private function validateInputs($inputs) {
        return $this->validations->ValidaInputs($inputs);
    }

    private function sendJsonResponse($response) {
        header("Content-Type: application/json");
        echo json_encode($response);
    }
}

// Uso del manejador de solicitudes
$requestHandler = new RequestHandler();
$requestHandler->handleRequest();

?>
