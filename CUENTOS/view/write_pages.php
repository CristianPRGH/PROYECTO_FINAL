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
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="../styles/output.css" />

    <script src="../frontend/bookPageManager.js"></script>

    <!-- QUILL -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
    <!-- ----- -->

</head>

<body class="bg-orange-100 h-screen flex flex-col">
    <p id="bookid" class="hidden"><?= $bookid; ?></p>

    <main class="flex justify-between items-center w-full h-full lg:w-1/2 duration-200 mx-auto">
        <section class="h-full w-full flex flex-col bg-white">
            <div id="toolbar-container">
                <span class="ql-formats">
                    <select class="ql-font"></select>
                    <select class="ql-size"></select>
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-align"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-blockquote"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-indent" value="-1"></button>
                    <button class="ql-indent" value="+1"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-image"></button>
                    <button class="ql-clean"></button>
                </span>
            </div>
            <div id="editor" class="overflow-y-auto"></div>
        </section>
    </main>

    <section id="menu" class="absolute flex flex-col bottom-3 left-1/2 -translate-x-1/2 z-1000 shadow-md shadow-black/40 min-w-96 bg-white/90 backdrop-blur-md rounded-xl">
        <div class="flex align-bottom justify-between items-center text-xs px-2 bg-slate-200 rounded-t-md">
            <p id="prev-page"></p>
            <p id="current-page" class="text-base"></p>
            <p id="next-page"></p>
        </div>

        <section class="grid grid-cols-4 divide-x py-3">
            <div class="flex items-center justify-center">
                <i id="to-home" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">home</i>
            </div>
            <div class="flex items-center justify-center">
                <button id="prev" class="rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125">chevron_left</button>
            </div>
            <div class="flex items-center justify-center">
                <button id="next" class="rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125">chevron_right</button>
            </div>
            <div class="flex items-center justify-center">
                <button id="confirm" class="rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125">check_circle</button>
            </div>
        </section>
    </section>

    <dialog id="confirm-pages" class="p-6 m-auto shadow-lg rounded-md z-20 backdrop:bg-orange-100/30 backdrop:backdrop-blur-md">
        <p class="text-center p-3">Confirma las páginas escritas?</p>
        <article class="flex justify-evenly">
            <button id="write-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="write-no" type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>

</body>

</html>