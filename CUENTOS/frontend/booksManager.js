import { Book } from "./Book.js";
import { BookListItem } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";


// const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
const bookDialogTween = gsap.fromTo("#book-dialog", {opacity: 0, scale: 0}, { duration: 0.1, scale: 1, opacity: 1, paused: true });
let bookClass = null;

document.addEventListener('DOMContentLoaded', async () => {
  bookClass = new Book();

  // CARGA LA LISTA DE LIBROS EN EL CAROUSEL
  await SetupMainBooksList();

  // CONFIGURA LOS ELEMENTOS PARA ABRIR EL DIALOG DEL DETALLE DEL LIBRO
  SetupToggleBookDetail();

  document.getElementById("det-bookMoreDetails").addEventListener('click', (event)=>{
    window.location = `view/book_detail.php?bookid=${event.target.dataset.bookid}`;
  });
})

// CARGA LA LISTA PRINCIPAL DE LIBROS
async function SetupMainBooksList()
{
  // BUSCA, OBTIENE Y CARGA LOS LIBROS
    await bookClass.SearchAllBooks();
    const books = bookClass.GetBooks();
    const booksList = document.getElementById("books-items");
        booksList.innerHTML = books.map(book =>
        BookListItem(book)
    ).join('');
    
    // CONFIGURA EL SLIDER DE LOS LIBROS
    // const swiper = new Swiper(".multiple-slide-carousel", {
    //   loop: true,
    //   slidesPerView: 3,
    //   spaceBetween: 10,
    //   navigation: {
    //     nextEl: ".multiple-slide-carousel .carousel-button-next",
    //     prevEl: ".multiple-slide-carousel .carousel-button-prev",
    //   },
    //   breakpoints: {
    //     1536: {
    //       slidesPerView: 6,
    //       spaceBetween: 30,
    //     },
    //     1024: {
    //       slidesPerView: 5,
    //       spaceBetween: 30,
    //     },
    //     450: {
    //       slidesPerView: 4,
    //       spaceBetween: 10,
    //     }
    //   },
    // });
}

// SETUP DE LOS BOTONES QUE MUESTRAN EL DETALLE DE CADA LIBRO
function SetupToggleBookDetail()
{
    document.getElementById("close-bookDialog").addEventListener('click', ()=>{
      ToggleBookDetail(null, bookDialogTween);
    });

    /* -- Botones para ver el detalle del libro -- */
    const toggleBookDetail = document.getElementsByClassName("open-bookDialog");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, bookDialogTween);});
    });
}

// ACTIVA/DESACTIVA LA PANTALLA DEL DETALLE DEL LIBRO
let bookDetailActive = false;
function ToggleBookDetail(toggle = null, tween)
{
    const dialog = document.getElementById("book-dialog");
    if (toggle != null) { SetBookDetail(toggle);}
    !bookDetailActive ? tweens.PlayAnimation(tween) : tweens.ReverseAnimation(tween);
    !bookDetailActive ? dialog.showModal() : dialog.close();

    bookDetailActive = !bookDetailActive;
}

// CARGA LA INFORMACIÓN DEL LIBRO
function SetBookDetail(toggle)
{
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO
    const bookid = toggle.id.split('-').pop();
    // const result = book.SearchBookById(bookid);

    const bookslist = bookClass.GetBooks();
    const book = bookslist.filter(book => book.id == bookid)[0];

    document.getElementById("det-bookCover").src =  `images/books_covers/${book.bk_cover}`;
    document.getElementById("det-bookTitle").textContent = book.bk_title;
    document.getElementById("det-bookAuthor").textContent = book.username;
    document.getElementById("det-bookAuthorImg").src = `images/users_avatars/${book.userimg}`;
    document.getElementById("det-bookMoreDetails").dataset.bookid = book.id;

    // document.getElementById("det-bookCover").src = "";
    // document.getElementById("det-bookTitle").textContent = "";
    // document.getElementById("det-bookAuthor").textContent = "";


    // const books = book.GetBooks();
    // const selectedbook = books.find(book => book.properties.id.includes(bookid));
    // if (selectedbook)
    // {
    //     const bookDetail = document.getElementById("book-details");
    //     bookDetail.innerHTML = BookDetail(selectedbook);
    //     const toogleCloseDetail = document.getElementById("close-book-detail");
    //     toogleCloseDetail.addEventListener('click', ()=>{ToggleBookDetail(null, bookDialogTween);})
    // }
}