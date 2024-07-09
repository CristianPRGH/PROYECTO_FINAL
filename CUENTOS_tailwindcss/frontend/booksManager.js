import { BookListItem, BookDetail } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";

let bookDetailActive = false;
let books = null;

// OBTIENE LA LISTA DE LIBROS
export async function GetBooks()
{
    try {
        const res = await fetch("../books.json");
        if (res.ok)
        {
            books = await res.json();
            SetupMainBooksList();
        }else {
            console.error('Error fetching books:', res.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// CARGA LA LISTA PRINCIPAL DE LIBROS
function SetupMainBooksList()
{
    const booksList = document.getElementById("books-list");

    booksList.innerHTML = books.map(book =>
        BookListItem(book.properties.id, book.properties.cover, book.properties.title, book.properties.author.name, book.properties.coauthors.length, book.properties.pages, book.properties.tags)
    ).join('');

    SetupToggleBookDetail();
}

// SETUP DE LOS BOTONES QUE MUESTRAN EL DETALLE DE CADA LIBRO
function SetupToggleBookDetail()
{
    /* -- Botones para ver el detalle del libro -- */
    // const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
    const toggleBookDetail = document.getElementsByClassName("book-details-toggle");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, tweens.bookDetailTween)});
    });
}

// ACTIVA/DESACTIVA LA PANTALLA DEL DETALLE DEL LIBRO
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
    const book = books.find(book => book.properties.id.includes(bookid));
    if (book)
    {
        const bookDetail = document.getElementById("book-details");
        bookDetail.innerHTML = BookDetail(book);
        const toogleCloseDetail = document.getElementById("close-book-detail");
        toogleCloseDetail.addEventListener('click', ()=>{ToggleBookDetail(null, tweens.bookDetailTween)})
    }
}