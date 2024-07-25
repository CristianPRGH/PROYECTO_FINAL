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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="../frontend/createBookManager.js" type="module"></script>
</head>
<body class="bg-[#F7F3E9] h-screen flex flex-col p-2">
    <main id="book-cover" class="flex items-start h-full bg-white rounded-t-lg">
        <!-- <section class="w-[10%] h-full rounded-sm shadow-[inset_-2px_0_3px_rgba(137,137,137,0.5)] bg-transparent flex flex-col justify-start items-center"></section> -->
        <section class="flex flex-col justify-center w-full h-full p-4 rounded-sm shadow-[inset_5px_2px_3px_rgba(137,137,137,0.5)] relative">
            <input type="text" id="" placeholder="título" class="form-input placeholder:text-sm placeholder:italic rounded-sm pl-4 z-10">
            <div class="relative z-10 ">
                <textarea id="book-sinopsis" placeholder="Sinopsis" class="form-input placeholder:italic placeholder:text-sm pl-4 rounded-sm text-justify" rows="6" maxlength="300"></textarea>
                <p class="absolute -bottom-1 right-2 text-xs"><span id="curr-letters">0</span>/300</p>
            </div>
            <select id="book-categories" class="form-input rounded-sm pl-4 z-10">
                <option value="-1">- Categoría -</option>
            </select>
            <input type="number" id="book-pages" placeholder="nº páginas (1-500)" class="form-input placeholder:text-sm placeholder:italic rounded-sm pl-4 z-10">
            <input type="text" list="tags-list" id="" placeholder="tags" class="form-input placeholder:text-sm placeholder:italic rounded-sm pl-4 z-10">
            <datalist id="tags-list"></datalist>
            <div class="h-full w-full absolute top-0 left-0 z-0">
                <img src="" alt="" id="book-cover-img" class="w-full h-full opacity-0">
            </div>
        </section> 
    </main>

    <section class="bg-green-900 w-full flex items-center justify-between p-1 rounded-b-lg">
        <div class="flex items-center justify-evenly w-1/2">
            <label for="select-cover-img" class="material-symbols-rounded cursor-pointer text-white">add_photo_alternate</label>
            <input type="file" id="select-cover-img" class="hidden" accept="image/*">
            <i id="remove-cover-img" class="material-symbols-rounded cursor-pointer text-white">remove_selection</i>
            <input type="color" id="book-cover-color" class="w-5 h-5 ring-1 ring-white">
        </div>
        <i id="create-book" class="material-symbols-rounded cursor-pointer text-white justify-self-end">check_circle</i>
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