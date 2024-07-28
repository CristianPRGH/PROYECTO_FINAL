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
    <!-- <script src="frontend/booksManager.js" type="module"></script> -->
</head>
<body class="bg-[#F7F3E9] relative h-screen flex flex-col">


    <main id="index-main" class="index-main flex-row p-4 h-[90%]">
        <article class="relative w-full">
            <input type="text" id="input-search" class="w-full p-1 pl-10 rounded-md outline-none border-2 border-b-4 border-orange-500 placeholder:italic placeholder:text-sm" placeholder="Título, autor">
            <i class="material-symbols-rounded form-icon top-1">search</i>
        </article>

        <section class="flex flex-col pb-2 mt-2 h-full overflow-y-auto overflow-x-hidden scroll">
            <section id="books-list"></section>
        </section>

        <section id="book-details" class="w-full h-full flex flex-col fixed bg-[#F7F3E9] top-0 -right-[100%] p-8 opacity-0 z-10 overflow-y-auto"></section>
    </main> 

    <aside id="menu-bookfilters" class="flex flex-col justify-between bg-[#A8E6CF] fixed bottom-0 w-full h-full p-8 z-10 -left-full opacity-0">
        <i id="closeBookFilters" class="material-symbols-rounded text-[#333333] self-end cursor-pointer">close</i>

        <!-- <article class="relative w-full">
            <input type="text" id="input-search" class="w-full p-1 pl-10 rounded-md outline-none border-b-4 border-b-orange-500 placeholder:italic placeholder:text-sm" placeholder="Título, autor">
            <i class="material-symbols-rounded form-icon top-1">search</i>
        </article> -->

        <article class="w-full h-full my-3">
            <div class="w-full relative">
                <input type="text" class="w-full p-1 pl-10 rounded-md rounded-b-none outline-none border-b-2 border-b-orange-500 placeholder:italic placeholder:text-sm" placeholder="Tags (separados por espacios)">
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
            <button type="button" class="group w-full bg-white p-2 rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Aplicar filtros<i class="material-symbols-rounded group-hover:text-white">filter_alt</i></button>
        </article>
    </aside>

    <aside id="index-rightmenu" class="flex flex-col justify-between bg-[#A8E6CF] fixed bottom-0 w-full h-full -right-full p-6 z-10 opacity-0">
        <i id="closeAccountMenu" class="material-symbols-rounded text-[#333333] self-start cursor-pointer">close</i>

        <section class="flex flex-col items-center border-b-2 border-b-orange-500 py-3">
            <img id="logged-userimg" src="./images/users_avatars/user-default.png" class="w-40 h-40 justify-center rounded-full border-4 border-orange-100">
            <div class="flex flex-col text-[#333333] w-full">
                <p id="logged-username" class="text-center">User</p>
                <p class="user-books">Autor de:   <span class="font-bold text-orange-500">#</span> libros</p>
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

    <footer id="index-footer" class="absolute grid grid-cols-3 justify-center bottom-3 z-1000 rounded-xl bg-white/90 backdrop-blur-md py-3 w-[90%] shadow-md shadow-black/40 left-5 divide-x">
        <div class="flex items-center justify-center">
            <i id="openBookFilters" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125 ">menu</i>
        </div>
        <div class="flex items-center justify-center">
            <i id="homePage" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">home</i>
        </div>
        <div class="flex items-center justify-center">
            <i id="openAccountMenu" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">account_circle</i>
        </div>
    </footer>
</body>
</html>