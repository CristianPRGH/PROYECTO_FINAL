<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="./styles/output.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="frontend/main.js" type="module"></script>
    <script src="frontend/booksManager.js" type="module"></script>
</head>
<body class="bg-orange-100 h-screen flex flex-col">
    <header id="index-footer" class=" h-[10%] flex self-bottom border-b-4 border-b-orange-500 bg-green-900">
        <section class="w-full">
            <i id="toggleLeftMenu" class="material-symbols-rounded w-full h-full cursor-pointer text-orange-100 flex items-center justify-center">menu</i>
        </section>
        <section class="w-full">
            <i id="homePage" class="material-symbols-rounded w-full h-full cursor-pointer text-orange-100 flex items-center justify-center">home</i>
        </section>
        <section class="w-full">
            <i id="toggleRightMenu" class="material-symbols-rounded w-full h-full cursor-pointer text-orange-100 flex items-center justify-center">account_circle</i>
        </section>
    </header>

    <main id="index-main" class="index-main flex-row p-4 h-[90%]">
        <section class="flex flex-col pb-2 h-full overflow-y-auto overflow-x-hidden scroll">
            <p class="w-full border-b border-b-green-900 mb-2">Libros</p>
            <section id="books-list"></section>
        </section>

        <section id="book-details" class="w-full h-full flex flex-col fixed bg-orange-100 ring-2 ring-green-900 top-0 -right-[100%] p-8 opacity-0 z-10 overflow-y-auto"></section>
    </main> 

    <aside id="menu-bookfilters" class="flex flex-col justify-between bg-green-900 fixed bottom-0 w-full h-[90%] p-8 z-10 -left-full opacity-0">
        <article class="relative w-full">
            <input type="text" id="input-search" class="w-full p-1 pl-10 rounded-md outline-none border-b-4 border-b-orange-500 placeholder:italic placeholder:text-sm" placeholder="Título, autor">
            <i class="material-symbols-rounded form-icon top-1">search</i>
        </article>

        <article class="w-full h-full my-3">
            <div class="w-full relative">
                <input type="text" class="w-full p-1 pl-10 rounded-md rounded-b-none outline-none border-b-2 border-b-orange-500 placeholder:italic placeholder:text-sm" placeholder="Tags (separados por espacio)">
                <i class="material-symbols-rounded form-icon top-1">sell</i>
            </div>
            <select id="" class="rounded-t-none rounded-b-md w-full h-5/6 outline-none"  multiple>
                <option class="form-select-option" value="1">Fantasía</option>
                <option class="form-select-option" value="2">Acción</option>
                <option class="form-select-option" value="3">Aventura</option>
                <option class="form-select-option" value="4">Romance</option>
                <option class="form-select-option" value="5">Ciencia ficción</option>
                <option class="form-select-option" value="6">Misterio</option>
                <option class="form-select-option" value="7">Terror</option>
                <option class="form-select-option" value="8">Drama</option>
                <option class="form-select-option" value="9">Histórico</option>
                <option class="form-select-option" value="10">Comedia</option>
                <option class="form-select-option" value="11">Thriller</option>
                <option class="form-select-option" value="12">Biografía-Autobiografía</option>
                <option class="form-select-option" value="13">Infantil-Juvenil</option>
                <option class="form-select-option" value="14">Policíaca</option>
                <option class="form-select-option" value="15">Ensayo</option>
                <option class="form-select-option" value="16">Poesía</option>
            </select>
        </article>

        <article class="w-full">
            <button type="button" class="group w-full bg-white p-2 rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Filtrar<i class="material-symbols-rounded group-hover:text-white">filter_alt</i></button>
        </article>
    </aside>

    <aside id="index-rightmenu" class="flex flex-col justify-between bg-green-900 fixed bottom-0 w-full h-[90%] -right-full p-6 z-10 opacity-0">
        <section class="flex flex-col items-center border-b-2 border-b-orange-500 py-3">
            <img src="./images/users_avatars/cristian.png" class="w-2/4 justify-center rounded-full border-4 border-orange-100">
            <div class="flex flex-col text-white w-full">
                <p class="text-center">User</p>
                <p class="user-books">Autor de: <span class="font-bold text-orange-500">#</span> libros</p>
                <p class="user-books">Coautor de: <span class="font-bold text-orange-500">#</span> libros</p>
            </div>
        </section>

        <section class="h-full flex flex-col justify-end overflow-y-auto">
        <?php if (isset($_SESSION["userid"])){ ?>
            <button id="new-book"   class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Crear libro  <i class="material-symbols-rounded group-hover:text-white">book_2</i></button>
            <button id="library"    class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Tus Libros   <i class="material-symbols-rounded group-hover:text-white">book_4</i></button>
            <button id="logout"     class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Logout       <i class="material-symbols-rounded group-hover:text-white">logout</i></button>
        <?php }else{ ?>
            <button id="to-login"   class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Login        <i class="material-symbols-rounded group-hover:text-white">login</i></button>
        <?php } ?>
        </section>
    </aside>


</body>
</html>