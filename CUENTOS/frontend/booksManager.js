import { Book } from "./Book.js";
import { BookListItem, BookDetail } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";


const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
let book = null;

export function InitializeMain()
{
    book = new Book();
    SetupMainBooksList();
}

// CARGA LA LISTA PRINCIPAL DE LIBROS
async function SetupMainBooksList()
{
    await book.SearchAllBooks();
    const books = book.GetBooks();
    const booksList = document.getElementById("books-list");

    booksList.innerHTML = books.map(eachbook =>
        BookListItem(eachbook)
    ).join('');

    SetupToggleBookDetail();
}

// SETUP DE LOS BOTONES QUE MUESTRAN EL DETALLE DE CADA LIBRO
function SetupToggleBookDetail()
{
    /* -- Botones para ver el detalle del libro -- */
    const toggleBookDetail = document.getElementsByClassName("book-details-toggle");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, bookDetailTween)});
    });
}

// ACTIVA/DESACTIVA LA PANTALLA DEL DETALLE DEL LIBRO
let bookDetailActive = false;
function ToggleBookDetail(toggle, tween)
{
    if (toggle) { SetBookDetail(toggle);}
    !bookDetailActive ? tweens.PlayAnimation(tween) : tweens.ReverseAnimation(tween);
    bookDetailActive = !bookDetailActive;
}

// CARGA LA INFORMACIÓN DEL LIBRO
function SetBookDetail(toggle)
{
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO
    const bookid = toggle.id.split('-').pop();
    const books = book.GetBooks();
    const selectedbook = books.find(book => book.properties.id.includes(bookid));
    if (selectedbook)
    {
        const bookDetail = document.getElementById("book-details");
        bookDetail.innerHTML = BookDetail(selectedbook);
        const toogleCloseDetail = document.getElementById("close-book-detail");
        toogleCloseDetail.addEventListener('click', ()=>{ToggleBookDetail(null, bookDetailTween)})
    }
}