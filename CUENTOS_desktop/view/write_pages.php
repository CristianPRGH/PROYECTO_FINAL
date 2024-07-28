<?php
session_start();
if (!isset($_SESSION["userid"]) || !isset($_GET["bookid"]))
{
    header('Location: ../index.php');
}
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

</head>
<body class="bg-orange-100 h-screen flex flex-col p-2">
    
    <main id="book-cover" class="flex justify-between items-center w-full h-full">
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

            <div class="flex align-bottom justify-between items-center text-xs px-2">
                <p id="prev-page"></p>
                <p id="current-page" class="text-base"></p>
                <p id="next-page"></p>
            </div>
        </section>
    </main>

    <section class="bg-green-900 rounded-b-lg flex justify-between p-1">
        <button id="prev" class="text-white rounded-md cursor-pointer material-symbols-rounded">chevron_left</button>
        <button id="confirm" class="text-white rounded-md cursor-pointer material-symbols-rounded">check_circle</button>
        <button id="next" class="text-white rounded-md cursor-pointer material-symbols-rounded">chevron_right</button>
    </section>

    <dialog id="confirm-pages" class="p-6 m-auto shadow-lg rounded-md z-20 backdrop:bg-orange-100/30 backdrop:backdrop-blur-md">
        <p class="text-center p-3">Confirma las páginas escritas?</p>
        <article class="flex justify-evenly">
            <button id="write-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="write-no"  type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>

</body>
</html>