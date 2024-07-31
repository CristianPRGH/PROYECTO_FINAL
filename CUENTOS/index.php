<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />
    <link rel="stylesheet" href="./styles/output.css" />

    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="frontend/main.js" type="module"></script>
    <script src="frontend/booksManager.js" type="module"></script>
    <!-- <script src="frontend/booksManager.js" type="module"></script> -->
</head>

<body class="bg-[#F7F3E9] relative h-screen flex flex-col">
    <main id="index-main" class="flex flex-col p-4 h-full md:w-3/4 md:self-center xl:w-2/3 duration-200">
        <article class="relative w-full md:self-center">
            <input type="text" id="input-search" class="w-full p-1 pl-10 rounded-md outline-none border-2 border-b-4 border-orange-500 placeholder:italic placeholder:text-sm" placeholder="Título, autor">
            <i class="material-symbols-rounded form-icon top-1">search</i>
        </article>

        <!-- <section class="flex flex-col pb-2 mt-2 h-full overflow-y-auto overflow-x-hidden scroll">
            <section id="books-list"></section>
        </section> -->

        <article class="w-full mt-2">
            <p class="text-lg border-b-2 border-b-[#333333] my-2">Últimos añadidos</p>
            <div class="swiper multiple-slide-carousel swiper-container flex flex-col">
                <div id="books-items" class="swiper-wrapper"></div>
                <div class="flex justify-evenly items-center m-auto w-full mt-4">
                    <button class="carousel-button-prev w-12 h-12">
                        <i class="material-symbols-rounded text-4xl text-[#333333]">arrow_circle_left</i>
                    </button>
                    <button class="carousel-button-next w-12 h-12">
                        <i class="material-symbols-rounded text-4xl text-[#333333]">arrow_circle_right</i>
                    </button>
                </div>
            </div>
        </article>
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
            <select id="" class="rounded-t-none rounded-b-md w-full h-5/6 outline-none" multiple>
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
                <p class="user-books">Autor de: <span class="font-bold text-orange-500">#</span> libros</p>
                <p class="user-books">Coautor de: <span class="font-bold text-orange-500">#</span> libros</p>
            </div>
        </section>

        <section class="h-full flex flex-col justify-end overflow-y-auto">
            <?php if (isset($_SESSION["userid"])) { ?>
                <button id="new-book" class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Crear libro <i class="material-symbols-rounded group-hover:text-white">book_2</i></button>
                <button id="library" class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Tus Libros <i class="material-symbols-rounded group-hover:text-white">book_4</i></button>
                <button id="logout" class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Logout <i class="material-symbols-rounded group-hover:text-white">logout</i></button>
            <?php } else { ?>
                <button id="to-login" class="group p-2 my-1 bg-white cursor-pointer rounded-md flex justify-between items-center hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80%">Login <i class="material-symbols-rounded group-hover:text-white">login</i></button>
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

    <dialog id="book-dialog" class="scale-0 m-auto w-96 h-fit p-4 rounded-md bg-white/30 backdrop:bg-[#333]/30 backdrop:backdrop-blur-md shadow-lg">
        <span id="close-bookDialog" class="material-symbols-rounded cursor-pointer">close</span>
        <p id="det-bookId" class="hidden"></p>
        <section class="h-full grid grid-cols-2 gap-0 grid-rows-1">
            <div class="flex justify-center items-center">
                <img id="det-bookCover" src="images/books_covers/cover.jpg" alt="" class="h-[200px] w-[128px] rounded-md shadow-md">
            </div>
            <div class="h-full w-full flex flex-col justify-start">
                <p id="det-bookTitle" class="font-bold truncate">Titulo prueba</p>
                <div class="flex gap-1 items-center">
                    <img id="det-bookAuthorImg" src="images/users_avatars/user-default.png" alt="" class="h-[32px] w-[32px]">
                    <p id="det-bookAuthor">Titulo prueba</p>
                </div>
                <div class="grow"></div>
                <button id="det-bookMoreDetails" data-bookid="-1" class="w-full flex justify-self-end justify-between bg-[#333] text-white outline-none p-1 rounded-md hover:scale-105 duration-200">
                    Más detalles
                    <i class="material-symbols-rounded">info</i>
                </button>
            </div>
        </section>
    </dialog>
</body>

</html>