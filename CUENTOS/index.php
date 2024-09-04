<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,300,0,0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="styles/output.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="frontend/mainManager.js" type="module"></script>
    <script src="frontend/mainBooksManager.js" type="module"></script>

</head>

<body class="flex">
    <!-- <aside id="menu-bookfilters" class="flex flex-col justify-between bg-[#A8E6CF] fixed top-0 w-full h-full p-8 z-50 -left-full opacity-0 xl:left-0 xl:w-1/4 xl:opacity-100 xl:static"> -->
    <aside id="menu-bookfilters" class="bg-[#A8E6CF] flex flex-col gap-y-4 fixed top-0 left-0 z-50 w-full h-full p-6 px-2 transition-transform -translate-x-full shadow-lg sm:w-1/2 md:w-1/2 xl:sticky xl:translate-x-0 xl:w-1/4" aria-label="Sidebar">
        <i id="closeBookFilters" data-drawer-target="menu-bookfilters" data-drawer-toggle="menu-bookfilters" class="material-symbols-rounded text-[#333333] self-end cursor-pointer xl:hidden">close</i>

        <article class="w-full">
            <div class="w-full relative">
                <input type="text" id="filter-tags-input" class="w-full p-2 pl-10 rounded-md rounded-b-none text-xs placeholder:italic placeholder:text-xs border-0 focus:border-transparent focus:ring-0 focus:shadow-md" placeholder="Tags (separados por comas)">
                <i class="material-symbols-rounded form-icon">sell</i>
            </div>
            <select id="filter-tags-select" class=" w-full h-96 rounded-b-md border-0 text-xs focus:border-transparent focus:ring-0 focus:shadow-md" multiple>
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
            <!-- hover:bg-gradient-to-r hover:from-white hover:from-80% hover:to-green-700 hover:to-80% -->
            <button type="button" id="apply-filters" class="group w-full bg-white p-2 text-sm rounded-md flex justify-between items-center hover:border-b-4 hover:border-b-green-700">Aplicar filtros<i class="material-symbols-rounded group-hover:text-green-700">filter_alt</i></button>
        </article>
    </aside>

    <section id="index-main" class="flex flex-col gap-4 p-4 w-full h-full z-0 xl:2/4">
        <div id="swiper1" class="swiper w-full h-fit py-4 lg:w-4/5">
            <p>Novedades</p>
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev scale-50 hover:scale-75 duration-200 text-[#333333]"></div>
            <div class="swiper-button-next scale-50 hover:scale-75 duration-200 text-[#333333]"></div>
        </div>

        <div id="swiper1" class="swiper w-full h-fit py-4 lg:w-4/5">
            <p>Mas Leidos</p>
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev scale-50 hover:scale-75 duration-200 text-[#333333]"></div>
            <div class="swiper-button-next scale-50 hover:scale-75 duration-200 text-[#333333]"></div>
        </div>
    </section>

    <aside id="menu-useraccount" class="bg-[#A8E6CF] flex flex-col fixed top-0 left-0 z-50 w-full h-full p-6 px-2 transition-transform -translate-x-full shadow-lg sm:w-1/2 md:w-1/3 xl:sticky xl:translate-x-0 xl:w-1/4" aria-label="Sidebar">
        <i id="closeAccountMenu" data-drawer-target="menu-useraccount" data-drawer-toggle="menu-useraccount" class="material-symbols-rounded text-[#333333] self-start cursor-pointer xl:hidden">close</i>

        <section class="flex flex-col items-center border-b-2 border-b-orange-500 py-3">
            <img id="logged-userimg" src="./images/users_avatars/user-default.png" class="w-40 h-40 justify-center rounded-full border-4 border-orange-100">
            <div class="flex flex-col text-[#333333] w-full">
                <p id="logged-username" class="text-center">User</p>
                <p class="user-books">Autor de: <span class="font-bold text-orange-500">#</span> libros</p>
                <p class="user-books">Coautor de: <span class="font-bold text-orange-500">#</span> libros</p>
            </div>
        </section>

        <section class="h-full flex flex-col justify-end gap-y-2 overflow-y-auto">
            <?php if (isset($_SESSION["userid"])) { ?>
                <button id="new-book" class="group w-full bg-white p-2 text-sm rounded-md flex justify-between items-center border-b-4 border-b-white hover:border-b-4 hover:border-b-green-700">Crear libro <i class="material-symbols-rounded group-hover:text-green-700">book_2</i></button>
                <button id="library" class="group w-full bg-white p-2 text-sm rounded-md flex justify-between items-center border-b-4 border-b-white hover:border-b-4 hover:border-b-green-700">Tus Libros <i class="material-symbols-rounded group-hover:text-green-700">book_4</i></button>
                <button id="logout" class="group w-full bg-white p-2 text-sm rounded-md flex justify-between items-center border-b-4 border-b-white hover:border-b-4 hover:border-b-green-700">Logout <i class="material-symbols-rounded group-hover:text-green-700">logout</i></button>
            <?php } else { ?>
                <button id="to-login" class="group w-full bg-white p-2 text-sm rounded-md flex justify-between items-center border-b-4 border-b-white hover:border-b-4 hover:border-b-green-700"">Login <i class=" material-symbols-rounded group-hover:text-green-700">login</i></button>
            <?php } ?>
        </section>
    </aside>

    <section id="filtered-books-panel" class="bg-[#F7F3E9] fixed grid grid-cols-1 xl:grid-cols-[20%_1fr_20%] grid-rows-1 w-full h-full p-8 z-30 -top-full opacity-0">
        <div class="hidden xl:block"></div>
        <section class="w-full h-full ">
            <p class="text-xs">Búsqueda de libros por título/autor: <span id="books-bytext-label"></span></p>
            <p class="text-xs">Búsqueda de libros por tags: <span id="books-bytags-label"></span></p>
            <article id="filtered-books" class="flex flex-wrap gap-y-3 content-start justify-start h-full w-full p-4 "></article>
        </section>
        <div class="hidden xl:block"></div>
    </section>

    <section id="menu" class="fixed bottom-4 left-1/2 -translate-x-1/2 h-fit flex flex-col shadow-md shadow-black/40 min-w-96 bg-white/90 backdrop-blur-md rounded-xl opacity-100 z-40 ">
        <article class="relative w-full flex">
            <input type="text" id="searchByNameValue" class="w-full p-1 pl-8 rounded-t-md xl:rounded-md border-0 focus:border-transparent focus:ring-0 focus:shadow-md focus:bg-[#A8E6CF] placeholder:italic placeholder:text-xs" placeholder="Título | autor">
            <!-- <button id="searchByName" class="material-symbols-rounded rounded-tr-md px-3 bg-[#333] text-white">search</button> -->
            <i class="material-symbols-rounded form-icon">search</i>
        </article>
        <section class="grid grid-cols-2 divide-x py-3 z-1000 xl:hidden">
            <div class="flex items-center justify-center">
                <button id="openBookFilters" data-drawer-target="menu-bookfilters" data-drawer-toggle="menu-bookfilters" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">menu</button>
            </div>
            <!-- <div class="flex items-center justify-center">
                <button id="home" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">home</button>
            </div> -->
            <div class="flex items-center justify-center">
                <button id="openAccountMenu" data-drawer-target="menu-useraccount" data-drawer-toggle="menu-useraccount" class="material-symbols-rounded cursor-pointer text-[#333333] text-3xl duration-100 hover:scale-125">account_circle</button>
            </div>
        </section>
    </section>

    <dialog id="book-dialog" class="dialogWindow">
        <span id="close-bookDialog" class="material-symbols-rounded cursor-pointer">close</span>
        <p id="det-bookId" class="hidden"></p>
        <section class="h-full grid grid-cols-2 gap-0 grid-rows-1">
            <div class="flex justify-center items-center">
                <img id="det-bookCover" src="" alt="" class="h-[200px] w-[128px] rounded-md shadow-md">
            </div>
            <div class="h-full w-full flex flex-col gap-1 justify-start">
                <p id="det-bookTitle" class="font-bold truncate">Titulo prueba</p>
                <div class="flex gap-1 items-center">
                    <img id="det-bookAuthorImg" src="images/users_avatars/user-default.png" alt="" class="h-6 w-6">
                    <p id="det-bookAuthor">Titulo prueba</p>
                </div>
                <!-- <div class="flex items-center justify-center gap-1">

                </div> -->
                <div class="grow flex items-center justify-center gap-2">
                    <div class="flex items-center gap-1">
                        <i class="material-symbols-rounded">visibility</i>
                        <p id="det-bookViews" class="font-bold text-sm"></p>
                    </div>
                    -
                    <div class="flex items-center gap-1">
                        <svg class="ratingStar text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path class="pointer-events-none" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p id="det-bookRating" class="font-bold text-sm"></p>
                    </div>
                </div>
                <button id="det-bookRead" data-bookid="-1" class="w-full flex justify-self-end justify-between bg-[#333] text-white outline-none p-1 rounded-md hover:scale-105 duration-200 hover:bg-slate-700">
                    Leer
                    <i class="material-symbols-rounded">menu_book</i>
                </button>
                <button id="det-bookMoreDetails" data-bookid="-1" class="w-full flex justify-self-end justify-between bg-[#333] text-white outline-none p-1 rounded-md hover:scale-105 duration-200 hover:bg-slate-700">
                    Más detalles
                    <i class="material-symbols-rounded">info</i>
                </button>
            </div>
        </section>
    </dialog>

    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></script>
</body>

</html>