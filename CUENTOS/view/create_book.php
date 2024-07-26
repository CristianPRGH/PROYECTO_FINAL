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
<body class="bg-[#F7F3E9] h-screen">
    <main id="book-cover" class="relative flex items-start h-full bg-white rounded-t-lg">
        <!-- <section class="w-[10%] h-full rounded-md shadow-[inset_-2px_0_3px_rgba(137,137,137,0.5)] bg-transparent flex flex-col justify-start items-center"></section> -->
        <section class="flex flex-col justify-center w-full h-full p-4 rounded-md shadow-md relative"> <!--[inset_5px_2px_3px_rgba(137,137,137,0.2)] -->
            <div class="relative w-full z-10">
                <input type="text" id="book-title" placeholder="título" class="v_required form-input placeholder:text-sm placeholder:italic rounded-md pl-4 " data-valid="valid-title">
                <div id="valid-title" class="validate-input" data-errormsg="error-title">
                    <i class="material-symbols-rounded form-error-icon">error</i>
                    <p id="error-title" class="form-error-message bg-white my-1"></p>
                    <i class="material-symbols-rounded form-valid-icon">check_circle</i>
                </div>
            </div>

            <div class="relative z-10 ">
                <textarea id="book-sinopsis" placeholder="Sinopsis" class="form-input placeholder:italic placeholder:text-sm pl-4 rounded-md text-justify" rows="6" maxlength="300"></textarea>
                <p class="absolute -bottom-1 right-2 text-xs"><span id="curr-letters">0</span>/300</p>
            </div>
            <select id="book-categories" class="form-input rounded-md pl-4 z-10">
                <option value="-1">- Categoría -</option>
            </select>

            <div class="z-10 bg-white form-input px-4 rounded-md">
                <label for="book-pages" class="text-slate-400 italic text-sm">Páginas</label>
                <input type="range" value="10" min="10" max="500" step="1" id="book-pages"  class="w-full p-1 h-1">
                <div class="w-full flex justify-between items-center px-2 ">
                    <p class="text-xs">10</p>
                    <p id="curr-pages" class="text-md font-bold opacity-50">10</p>
                    <p class="text-xs">500</p>
                </div>
            </div>
            
            <input type="text" list="tags-list" id="book-tags" placeholder="tags" class="form-input placeholder:text-sm placeholder:italic rounded-md pl-4 z-10">
            <datalist id="tags-list"></datalist>
            <div class="h-full w-full absolute top-0 left-0 z-0">
                <img src="" alt="" id="book-cover-img" class="w-full h-full opacity-0">
            </div>
        </section> 
    </main>

    <section class="absolute grid grid-cols-5 justify-center bottom-3 z-1000 rounded-xl bg-white/90 backdrop-blur-md py-3 w-[90%] shadow-md shadow-black/40 left-5 divide-x">
        <i id="to-home" class="material-symbols-rounded cursor-pointer text-center duration-100 hover:scale-125">home</i>
        <label for="select-cover-img" class="material-symbols-rounded cursor-pointer text-center duration-100 hover:scale-125">add_photo_alternate</label>
        <input type="file" id="select-cover-img" class="hidden" accept="image/*">
        <i id="remove-cover-img" class="material-symbols-rounded cursor-pointer text-center duration-100 hover:scale-125">remove_selection</i>
        <div class="w-full flex items-center justify-center duration-100 hover:scale-125">
            <input type="color" id="book-cover-color" class="cursor-pointer w-5 h-5 ring-1 ring-white">
        </div>
        <i id="create-book" class="material-symbols-rounded cursor-pointer text-center duration-100 hover:scale-125">check_circle</i>
    </section>

    <!-- <section class="bg-green-900 w-full flex items-center justify-between p-1 rounded-b-lg">
    </section> -->

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