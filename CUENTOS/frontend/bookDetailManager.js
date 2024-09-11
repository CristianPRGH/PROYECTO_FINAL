import { Book } from "./Book.js";
import { BookDetail } from "../components/book_item.js";

let bookid;

document.addEventListener("DOMContentLoaded", () => {
  GetUrlParams();

  // bookid = window.location.href.split("=").pop();
  const bookClass = new Book();
  GetBookDetail(bookClass);

  InitializeEvents();
});

function GetUrlParams() {
  // Obtiene los parametros en la URL
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  bookid = urlParams.get("bookid");
}

async function GetBookDetail(bookClass) 
{
  // console.log(bookid)
    const book      = await bookClass.SearchBookById(bookid);
    const coauthors = await bookClass.SearchBookCoauthors(bookid);
    const comments  = await bookClass.SearchBookComments(bookid);
    // console.log(comments);
    const bookdata  = BookDetail(book.data, coauthors.data, comments.data);

    document.getElementById("book-detail").innerHTML = bookdata;
}

function InitializeEvents()
{
  document.getElementById("home").addEventListener("click", () => {
    window.location = "../index.php";
  });

  const userid = document.getElementById("det-userid").textContent;

  document.getElementById("read").addEventListener("click", () => {
    window.location = `pages_manager.php?bookid=${bookid}&user=${userid}&mode=read`;
  });

  document.getElementById("modify").addEventListener("click", () => {
    window.location = `pages_manager.php?bookid=${bookid}&user=${userid}&mode=upd`;
  });
}