<?php

try {
    $conn = mysqli_connect("localhost", "root", "", "cristianperez_erp");
    
    if (isset($_POST["submitForm"]))
    {
        $username = $_POST["username"];
        $password = sha1(md5($_POST["password"]));

        $query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';


        $params[] = $username;
        $params[] = $password;
        $types = "ss";

        $stmt = $conn->prepare($query);

        if ($stmt && count($params) > 0) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        print_r($result);
    }


} catch (\Throwable $th) {
    //throw $th;
}finally{
    $conn->close();
}