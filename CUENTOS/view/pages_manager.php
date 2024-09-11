<?php
session_start();
// Si no estas registrado y entras en un modo que no sea "read" -> return
// Si en la url no está el id del libro o el modo de entrada -> return
if ((!isset($_SESSION["userid"]) && $_GET["mode"] != "read") || !isset($_GET["bookid"]) || !isset($_GET["mode"])) {
    header('Location: ../index.php');
}

if (isset($_GET["mode"]) && isset($_GET["bookid"])) {
    $mode = $_GET["mode"];
    $bookid = $_GET["bookid"];

    if (isset($_SESSION["userid"]))
        $userid = $_SESSION["userid"];
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />
    <link rel="stylesheet" href="../styles/output.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
    <script src="../frontend/bookPageManager.js" type="module"></script>

    <!-- QUILL -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
    <!-- ----- -->

</head>

<body class="h-screen flex flex-col">
    <section class="body-background"></section>
    <p id="bookid" class="hidden"><?= $bookid; ?></p>
    <p id="userid" class="hidden"><?= $userid; ?></p>

    <main id="main" class="w-full h-full duration-200 mx-auto shadow-lg md:w-2/3 lg:w-1/2">
        <section class="h-full w-full flex flex-col bg-white">
            <?php
            if ($mode == "ins" || $mode == "upd") {
            ?>
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
            <?php
            }
            ?>
            <div id="editor" class="bg-white overflow-y-auto rounded-b-md shadow-md"></div>
        </section>
    </main>

    <section id="menu" class="absolute bottom-4 left-1/2 -translate-x-1/2 h-fit flex flex-col  shadow-md shadow-black/40 min-w-96 bg-white/90 backdrop-blur-md rounded-xl opacity-100">
        <div class="flex items-center gap-x-2 py-1 pl-4">
            <p class="text-xs">Usuario:</p>
            <p id="username" class="text-xs"></p>
            <img id="userimg" src="" alt="" class="w-4 h-4">
        </div>
        <div id="menuheader" class="flex align-bottom justify-between items-center text-xs px-2 bg-slate-200 rounded-t-md">
            <p id="prev-page"></p>
            <p id="current-page" class="text-base text-black"></p>
            <p id="next-page"></p>
            <p id="pageid" class="hidden"></p>
        </div>

        <?php
        if ($mode == "ins" || $mode == "upd") {
        ?>
            <div id="menu_update">
                <section class="grid grid-cols-4 divide-x py-3 z-1000">
                    <div class="flex items-center justify-center">
                        <button id="home" class="home material-symbols-rounded cursor-pointer duration-100 hover:scale-125">home</button>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="prev rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125" data-dir="prev">chevron_left</button>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="next rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125" data-dir="next">chevron_right</button>
                    </div>
                    <div class="flex items-center justify-center">
                        <button id="confirm" class="rounded-md cursor-pointer material-symbols-rounded duration-100 hover:scale-125">check_circle</button>
                    </div>
                </section>
            </div>
        <?php
        } else if ($mode == "read") {
        ?>
            <div id="menu_read">
                <section class="grid grid-cols-3 divide-x py-3 z-1000">
                    <div class="flex items-center justify-center">
                        <button class="prev material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125" data-dir="prev">chevron_left</button>
                    </div>
                    <div class="flex items-center justify-center">
                        <button id="home" class="home material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">home</button>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="next material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125" data-dir="next">chevron_right</button>
                    </div>
                </section>
            </div>
        <?php
        }   // else
        ?>
    </section>



    <dialog id="confirm-pages" class="dialogWindow">
        <p class="text-center p-3">Confirma las páginas escritas?</p>
        <article class="flex justify-evenly">
            <button id="write-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="write-no" type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>

    <dialog id="comment-dialog" class="dialogWindow">
        <p id="comment-question" class="text-center p-3 ">¿ Te ha gustado lo que has leído ?</p>
        <div class="flex flex-col gap-y-2 my-2">
            <div class="flex justify-center">
                <div id="ratingStarsContainer" class="flex items-center gap-x-1">
                    <svg class="star ratingStar" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" data-point="1">
                        <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="star ratingStar" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" data-point="2">
                        <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="star ratingStar" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" data-point="3">
                        <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="star ratingStar" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" data-point="4">
                        <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="star ratingStar" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20" data-point="5">
                        <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                </div>
            </div>

            <div>
                <textarea id="book-comment" rows="3" maxlength="150" placeholder="Escribe un comentario..." class="form-input w-full resize-none rounded-md text-sm placeholder:italic placeholder:text-xs"></textarea>
            </div>
        </div>

        <article class="flex justify-evenly">
            <button id="comment-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-fit">CONFIRMAR</button>
            <button id="comment-no" type="button" class="shadow-md p-1 rounded-md bg-white text-[#333] w-20">SALIR</button>
        </article>
    </dialog>

</body>

</html>