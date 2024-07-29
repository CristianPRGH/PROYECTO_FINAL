<?php
session_start();
if (!isset($_SESSION["userid"]))
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
    <link rel="stylesheet" href="../styles/output.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="../frontend/createBookManager.js" type="module"></script>
</head>
<body class="relative h-screen flex justify-center">

    <main class="w-full h-full bg-white sm:flex sm:w-full xl:w-1/2 duration-200">

        <section class="flex flex-col w-full h-full p-4"> 
            <div class="relative w-full z-10">
                <input type="text" id="book-title" placeholder="título" class="v_required w-full border-0 placeholder:text-sm placeholder:italic rounded-md pl-4 shadow-md" data-valid="valid-title">
                <div id="valid-title" class="validate-input" data-errormsg="error-title">
                    <i class="material-symbols-rounded form-error-icon">error</i>
                    <p id="error-title" class="form-error-message bg-white my-1 rounded-t-lg"></p>
                    <i class="material-symbols-rounded form-valid-icon">check_circle</i>
                </div>
            </div>

            <div class="flex flex-col z-10 bg-white shadow-md my-1 pt-0 rounded-md">
                <textarea id="book-sinopsis" placeholder="Sinopsis" class="mb-4 w-full border-0 resize-none placeholder:italic placeholder:text-sm pl-4 rounded-md text-justify" rows="6" maxlength="300"></textarea>
                <p class="text-xs text-right mr-1"><span id="curr-letters">0</span>/300</p>
            </div>

            <select id="book-categories" class="w-full shadow-md border-0 rounded-md my-2 pl-4 z-10">
                <option value="-1" selected disabled>- Categoría -</option>
            </select>

            <div class="z-10 bg-white shadow-md px-4 rounded-md">
                <label for="book-pages" class="text-slate-400 italic text-sm">Páginas</label>
                <input type="range" value="10" min="10" max="500" step="1" id="book-pages"  class="w-full">
                <div class="w-full flex justify-between items-center">
                    <p class="text-xs">10</p>
                    <p id="curr-pages" class="text-md font-bold opacity-50">10</p>
                    <p class="text-xs">500</p>
                </div>
            </div>
            
            <input type="text" list="tags-list" id="book-tags" placeholder="tags" class="w-full border-0 shadow-md my-2 placeholder:text-sm placeholder:italic rounded-md pl-4 z-10">
            <datalist id="tags-list"></datalist>
        </section> 

        <section class="h-full w-full absolute top-0 z-0 sm:static">
            <img src="" alt="" id="book-cover-img" class="w-full h-full opacity-0">
        </section>
    </main>

    <section class="absolute grid grid-cols-5 divide-x bottom-3 left-1/2 -translate-x-1/2 z-1000 rounded-xl bg-white/90 backdrop-blur-md py-3 min-w-96 shadow-md shadow-black/40">
        <div class="flex items-center justify-center">
            <i id="to-home" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">home</i>
        </div>
        <div class="flex items-center justify-center">
            <label for="select-cover-img" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">add_photo_alternate</label>
            <input type="file" id="select-cover-img" class="hidden" accept="image/*">
        </div>
        <div class="flex items-center justify-center">
            <i id="remove-cover-img" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">remove_selection</i>
        </div>
        
        <div class="w-full flex items-center justify-center">
            <input type="color" id="book-cover-color" class="cursor-pointer w-5 h-5 ring-1 ring-white duration-100 hover:scale-125">
        </div>

        <div class="flex items-center justify-center">
            <i id="create-book" class="material-symbols-rounded cursor-pointer duration-100 hover:scale-125">check_circle</i>
        </div>
    </section>

    <dialog id="confirm-create-book" class="p-6 m-auto shadow-lg rounded-md z-20 backdrop:bg-orange-100/30 backdrop:backdrop-blur-md">
        <p class="text-center p-3">Desea crear el libro?</p>
        <article class="flex justify-evenly">
            <button id="create-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="create-no"  type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>

    <dialog id="confirm-write-book" class="p-6 m-auto shadow-lg rounded-md z-20 backdrop:bg-orange-100/30 backdrop:backdrop-blur-md">
        <p class="text-center p-3">Desea empezar a escribir el libro?</p>
        <article class="flex justify-evenly">
            <button id="write-yes" type="button" class="shadow-md p-1 rounded-md bg-green-600 text-orange-100 w-20">SI</button>
            <button id="write-no"  type="button" class="shadow-md p-1 rounded-md bg-red-600 text-orange-100 w-20">NO</button>
        </article>
    </dialog>
</body>
</html>