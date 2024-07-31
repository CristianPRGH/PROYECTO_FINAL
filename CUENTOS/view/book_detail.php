<?php
session_start();
if (!isset($_SESSION["userid"]) || !isset($_GET["bookid"])) {
    header('Location: ../index.php');
}

$bookid = $_GET["bookid"];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles/output.css" />

    <script src="../frontend/bookDetailManager.js" type="module"></script>

    <title>Document</title>
</head>

<body class="bg-[#F7F3E9]">
    <section id="book-detail-<?= $bookid; ?>" class="w-full h-full flex flex-col  p-8 overflow-y-auto"></section>
</body>

</html>