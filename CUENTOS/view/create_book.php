<?php
session_start();
if (!isset($_SESSION["userid"])) {
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
    <link rel="stylesheet" href="../styles/output.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="../frontend/createBookManager.js" type="module"></script>
</head>

<body class="relative h-screen flex justify-center">

    <main class="w-full h-full bg-white sm:flex md:w-full xl:w-2/3 duration-200">

        <section class="flex flex-col gap-y-2 w-full h-full p-4 z-30">
            <div class="relative w-full ">
                <input type="text" id="book-title" placeholder="título" maxlength="80" class="v_required form-input" data-valid="valid-title">
                <div id="valid-title" class="validate-input" data-errormsg="error-title">
                    <i class="material-symbols-rounded form-error-icon">error</i>
                    <p id="error-title" class="form-error-message my-1 rounded-t-lg"></p>
                    <i class="material-symbols-rounded form-valid-icon">check_circle</i>
                </div>
            </div>

            <div class="flex flex-col bg-white shadow-md my-1 pt-0 rounded-md">
                <textarea id="book-sinopsis" placeholder="Sinopsis" class="mb-4 w-full border-0 resize-none placeholder:italic placeholder:text-sm pl-4 rounded-md text-justify focus:border-transparent focus:ring-0 focus:shadow-xl" rows="6" maxlength="1000"></textarea>
                <p class="text-xs text-right mr-1"><span id="curr-letters">0</span>/1000</p>
            </div>

            <select id="book-categories" class="w-full shadow-md border-0 rounded-md my-2 pl-4 focus:border-transparent focus:ring-0 focus:shadow-xl">
                <option value="-1" selected disabled>- Categoría -</option>
            </select>

            <div class="bg-white shadow-md px-4 rounded-md">
                <label for="book-pages" class="text-slate-400 italic text-sm">Páginas</label>
                <input type="range" value="1" min="1" max="500" step="1" id="book-pages" class="w-full">
                <div class="w-full flex justify-between items-center">
                    <p class="text-xs">1</p>
                    <!-- <p id="curr-pages" class="text-md font-bold opacity-50">1</p> -->
                    <input id="curr-pages" type="text" inputmode="numeric" pattern="[0-9]*" class="form-input text-md font-bold  text-center w-fit focus:border-transparent focus:ring-0 focus:shadow-xl" value="1">
                    <p class="text-xs">500</p>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <div class="flex justify-center">
                    <datalist id="tags-list"></datalist>
                    <button id="add-tag-input" class="material-symbols-rounded cursor-pointer hover:scale-105">add_circle</button>
                    <button id="rem-tag-input" class="material-symbols-rounded cursor-pointer hover:scale-105 hidden">remove_circle</button>
                </div>
                <div id="book-tags" class="flex flex-wrap gap-x-2 justify-center w-full"></div>
                <!-- <input type="text" list="tags-list" id="book-tags" placeholder="tag" class="w-full border-0 shadow-md my-2 placeholder:text-sm placeholder:italic rounded-l-md pl-4">
                <datalist id="tags-list"></datalist> -->
            </div>
        </section>

        <section class="h-full w-full  top-0 z-0 ">
            <img src="" alt="" id="book-cover-img" class="w-full h-full opacity-0">
        </section>
    </main>

    <section class="absolute grid grid-cols-4 divide-x py-3 bottom-4 left-1/2 -translate-x-1/2 h-fit shadow-md shadow-black/40 min-w-96 bg-white/90 backdrop-blur-md rounded-xl z-50">
        <div class="flex items-center justify-center">
            <i id="home" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">home</i>
        </div>
        <div class="flex items-center justify-center">
            <label for="select-cover-img" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">add_photo_alternate</label>
            <input type="file" id="select-cover-img" class="hidden" accept="image/*">
        </div>
        <div class="flex items-center justify-center">
            <i id="remove-cover-img" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">remove_selection</i>
        </div>

        <div class="flex items-center justify-center">
            <i id="create-book" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">check_circle</i>
        </div>
    </section>

    <dialog id="confirm-create-book" class="dialogWindow">
        <p class="text-center p-3">Desea crear el libro?</p>
        <article class="flex justify-evenly">
            <button id="create-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="create-no" type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>

    <dialog id="confirm-write-book" class="dialogWindow">
        <p class="text-center p-3">Desea empezar a escribir el libro?</p>
        <article class="flex justify-evenly">
            <button id="write-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="write-no" type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>
</body>

</html>