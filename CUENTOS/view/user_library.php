<?php
session_start();
if (!isset($_SESSION["userid"])) {
    header('Location: ../index.php');
}

$userid = $_SESSION["userid"];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />
    <link rel="stylesheet" href="../styles/output.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="../frontend/userLibraryManager.js" type="module"></script>

    <title>Document</title>
</head>

<body>
    <p id="user-id" class="hidden"><?= $userid; ?></p>
    <main class="w-full h-full">
        <section id="books-list" class="w-full gap-4 p-20 flex flex-wrap justify-start">
        </section>
    </main>

    <dialog id="delete-book" class="fixed z-50 scale-0 m-auto w-96 h-fit p-4 rounded-md bg-white/30 backdrop:bg-[#333]/30 backdrop:backdrop-blur-md shadow-lg">
        <p id="det-bookId" class="hidden"></p>
        <div class="flex justify-between items-center bg-[#333]/10 rounded-md">
            <button id="confirm-delete" type="button" class="bg-green-300 p-2 w-16 rounded-md hover:shadow-md">Si</button>
            <p class="text-center text-lg">Desea eliminar el libro?</p>
            <button id="cancel-delete" type="button" class="bg-red-300 p-2 w-16 rounded-md hover:shadow-md">No</button>
        </div>
    </dialog>
</body>

</html>