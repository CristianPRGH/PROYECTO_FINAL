import { BookListItem, BookDetail } from "../components/book_item.js";
import { Book } from "../js/Book.js";
import * as tweens from "../components/tweenControls.js";


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
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, tweens.bookDetailTween)});
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
        toogleCloseDetail.addEventListener('click', ()=>{ToggleBookDetail(null, tweens.bookDetailTween)})
    }
}