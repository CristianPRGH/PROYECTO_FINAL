import { Book } from "./Book.js";
import { BookListItem, BookGridItem } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";


// const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
const tween_bookDialog = gsap.fromTo("#book-dialog", {opacity: 0, scale: 0}, { duration: 0.1, scale: 1, opacity: 1, paused: true });
const tween_booksFilteredPanel = gsap.to("#filtered-books-panel", { duration: 0.5, yPercent: 100, opacity: 1, ease: "sine.inOut", paused: true });
let bookClass = null;
let swiper;

document.addEventListener('DOMContentLoaded', async () => {
  bookClass = new Book();

  // CARGA LA LISTA DE LIBROS EN EL CAROUSEL
  SetupSwiper();
  await SetupMainBooksList();

  // CONFIGURA LOS ELEMENTOS PARA ABRIR EL DIALOG DEL DETALLE DEL LIBRO
  SetupOpenBookDialog();
  SetupCloseBookDialog();

  document.getElementById("det-bookMoreDetails").addEventListener('click', (event)=>{
    window.location = `view/book_detail.php?bookid=${event.target.dataset.bookid}`;
  });

  document.getElementById("det-bookRead").addEventListener('click', (event)=>{
    window.location = `view/pages_manager.php?bookid=${event.target.dataset.bookid}&mode=read`;
  });

  document.getElementById("searchByNameValue").addEventListener('input', SearchBooksByFilters);
  document.getElementById("apply-filters").addEventListener('click', SearchBooksByFilters);
})

function SetupSwiper()
{
  swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 0,
    mousewheel: true,
    rewind: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
      1728 :{
        slidesPerView: 6
      },
      1536 :{
        slidesPerView: 5
      },
      1280 :{
        slidesPerView: 4
      },
      1024 :{
        slidesPerView: 6
      },
      900 :{
        slidesPerView: 6
      },
      768 :{
        slidesPerView: 5
      },
      640 :{
        slidesPerView: 4
      },
      620 :{
        slidesPerView: 5
      },
      500 :{
        slidesPerView: 5
      },
      400: {
        slidesPerView: 4
      }
    }
  });

  // swiper.map(swip => console.log(swip.hostEl));
}

// CARGA LA LISTA PRINCIPAL DE LIBROS
async function SetupMainBooksList()
{
  // BUSCA, OBTIENE Y CARGA LOS LIBROS
  const newbooks = await bookClass.SearchAllBooks();
  if (newbooks != null)
  {
    newbooks.data.map(book => {
        const bookelement = BookListItem(book);
        swiper[0].appendSlide(bookelement);
    });
  }

  // BUSCA, OBTIENE Y CARGA LOS LIBROS
  const mostreadbooks = await bookClass.SearchMostReadBooks();
  if (mostreadbooks != null) {
    mostreadbooks.data.map(book => {
        const bookelement = BookListItem(book);
        swiper[1].appendSlide(bookelement);
    });
  }
}

// SETUP DE LOS BOTONES QUE MUESTRAN EL DETALLE DE CADA LIBRO
function SetupOpenBookDialog()
{
    /* -- Botones para ver el detalle del libro -- */
    const toggleBookDetail = document.getElementsByClassName("open-bookDialog");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, tween_bookDialog);});
    });
}

function SetupCloseBookDialog()
{
  document.getElementById("close-bookDialog").addEventListener('click', () => {
    ToggleBookDetail(null, tween_bookDialog);
  });
}

// ACTIVA/DESACTIVA LA PANTALLA DEL DETALLE DEL LIBRO
let bookDetailActive = false;
async function ToggleBookDetail(toggle = null, tween)
{
    const dialog = document.getElementById("book-dialog");
    if (toggle != null)
    { 
      await SetBookDetail(toggle);
    }
      !bookDetailActive ? tweens.PlayAnimation(tween) : tweens.ReverseAnimation(tween);
      !bookDetailActive ? dialog.showModal() : dialog.close();

      bookDetailActive = !bookDetailActive;
}

// CARGA LA INFORMACIÓN DEL LIBRO
async function SetBookDetail(toggle)
{
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO
    const bookid = toggle.id;
    console.log(bookid)
    const book   = await bookClass.SearchBookById(bookid);
    if (book != null)
    {
      const bookdata = book.data;
      const cover = bookdata.Cover != null ? bookdata.Cover : "bk_CoverNotAvailable.png";

      console.log(bookdata)
  
      document.getElementById("det-bookCover").src          = `images/books_covers/${cover}`;
      document.getElementById("det-bookTitle").textContent  = bookdata.Title;
      document.getElementById("det-bookAuthor").textContent = bookdata.username;
      document.getElementById("det-bookAuthorImg").src      = `images/users_avatars/${bookdata.userimg}`;
      document.getElementById("det-bookViews").textContent  = bookdata.Views;
      document.getElementById("det-bookMoreDetails").dataset.bookid = bookdata.UIBook;
      document.getElementById("det-bookRead").dataset.bookid = bookdata.UIBook;
      document.getElementById("det-bookRating").textContent = Math.round(bookdata.Rating * 100) / 100;
    }
}

let booksFilteredPanelActive = false;
async function SearchBooksByFilters()
{
  const titleAuthorValue = document.getElementById("searchByNameValue").value;
  document.getElementById("books-bytext-label").textContent = titleAuthorValue;
  
  const tagsString = SetupTagsString();
  document.getElementById("books-bytags-label").textContent = tagsString;

  if ((titleAuthorValue.length > 0 || tagsString.length > 0) && !booksFilteredPanelActive)
  {
    tweens.PlayAnimation(tween_booksFilteredPanel);
    booksFilteredPanelActive = true;
  } else if (titleAuthorValue.length == 0 && tagsString.length == 0)
  {
    tweens.ReverseAnimation(tween_booksFilteredPanel);
    booksFilteredPanelActive = false;
  }


  const bookList = await bookClass.SearchBooksByFilters(titleAuthorValue, tagsString);
  const grid = document.getElementById("filtered-books");
  grid.innerHTML = "";
  if (bookList.data.length > 0)
  {
    grid.innerHTML = bookList.data.map(book =>
      BookGridItem(book)
    ).join('')
  
    SetupOpenBookDialog();
  }
}

function SetupTagsString()
{
  let tags = [];

  // Limpia los 
  const othertags = document.getElementById("filter-tags-input").value.trim();
  if (othertags.length > 0)
  {
    const othertagsArray = othertags.split(',');
    othertagsArray.map(tag => {
      tags.push(tag.trim());
    })
  }

  const selected = document.getElementById("filter-tags-select").selectedOptions;
  Array.from(selected).map(option => {
    tags.push(option.textContent);
  })

  const tagsString = tags.join(',');

  return tagsString;
}