<?php
session_start();
if (!isset($_GET["bookid"])) {
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />

    <script src="../frontend/bookDetailManager.js" type="module"></script>

    <title>Document</title>
</head>

<body class="flex justify-center">
    <section id="book-detail" class="w-full h-full flex flex-col gap-2 p-8 pb-16 overflow-y-auto sm:w-2/3 lg:w-1/2 duration-200"></section>

    <section id="menu" class="fixed bottom-4 left-1/2 -translate-x-1/2 h-fit flex flex-col  shadow-md shadow-black/40 min-w-96 bg-white/90 backdrop-blur-md rounded-xl opacity-100">
        <section class="grid grid-cols-3 divide-x py-3 z-1000">
            <div class="flex items-center justify-center">
                <button id="home" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">home</button>
            </div>
            <div class="flex items-center justify-center">
                <button id="read" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">menu_book</button>
            </div>
            <div class="flex items-center justify-center">
                <button id="modify" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">history_edu</button>
            </div>
        </section>
    </section>
</body>

</html>