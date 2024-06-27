import { BookItemComponent } from "./book_item.js";

let bookDetailActive = false;
let books = null;

document.addEventListener('DOMContentLoaded', async () => {
    await GetBooks();
    SetupToggleMenus();
    SetupMainBooksList();
    SetupToggleBookDetail();

}); /* DOMContentLoaded */

 
async function GetBooks()
{
    try {
        const res = await fetch("../books.json");
        if (res.ok)
        {
            books = await res.json();
        }else {
            console.error('Error fetching books:', res.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


function SetupToggleMenus()
{
    /* -- Menus laterales -- */
    const menus = [
        {
            menu: document.getElementById("index-leftmenu"),
            toggle: document.getElementById("toggleLeftMenu"),
            active: false,
            tween: gsap.to("#index-leftmenu", { duration: 0.5, xPercent: 100, opacity: 1,ease: "sine.inOut", paused: true })
        },
        {
            menu: document.getElementById("index-rightmenu"),
            toggle: document.getElementById("toggleRightMenu"),
            active: false,
            tween: gsap.to("#index-rightmenu", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true })
        }
    ];

    // menus.forEach(({ toggle, tween }, index) => {
    //     toggle.addEventListener('click', () => {
    //         menus[index].active = !menus[index].active;
    //         menus[index].active ? tween.play() : tween.reverse();
    //     });
    // });
    /* ---------------- */
}

function ToggleBookDetail(toggle, tween)
{
    FillBookDetail(toggle);

    !bookDetailActive ? tween.play() : tween.reverse();
    bookDetailActive = !bookDetailActive;
}

function SetupToggleBookDetail()
{
    /* -- Botones para ver el detalle del libro -- */
    // const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
    // let toggleBookDetail = document.getElementsByClassName("book-details-toggle");
    // Array.from(toggleBookDetail).forEach((toggle)=>{
    //     toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, bookDetailTween)});
    // });
    /* ---------------- */
}

function SetupMainBooksList()
{
    const booksList = document.getElementById("books-list");

    booksList.innerHTML = books.map(book =>
        BookItemComponent(book.properties.cover, book.properties.title, book.properties.author.name, book.properties.coauthors.length, book.properties.pages, book.properties.tags)
    ).join('');
}

async function FillBookDetail(toggle)
{
    const bookid = toggle.id.split('-').pop();
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO

    const book = books.find(book => book.properties.id.includes(bookid));

    if (book)
    {
        document.getElementById("book-detail-cover").src = `../images/book_covers/${book.properties.cover}`;
        document.getElementById("book-detail-title").textContent = book.properties.title;
        document.getElementById("book-detail-pages").textContent = `Páginas: ${book.properties.pages}`;
        document.getElementById("book-detail-sinopsis").textContent = book.properties.sinopsis;
        document.getElementById("book-detail-author-img").src = `../images/${book.properties.author.image}`;
        document.getElementById("book-detail-author-name").textContent = book.properties.author.name;
        let coauthorsList = document.getElementById("book-detail-coauthors-list");
        coauthorsList.innerHTML = book.properties.coauthors.map(coauthor =>
            `<div class="book-detail-coauthor flex-row">
                <img class="book-detail-author-img" src="../images/${coauthor.image}">
                <p class="book-detail-coauthor-name">${coauthor.name}</p>
            </div>`
        ).join('');
    }
}