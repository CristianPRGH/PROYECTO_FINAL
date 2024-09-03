import { Book } from "./Book.js";
import { BookDetail } from "../components/book_item.js";

let bookid;

document.addEventListener("DOMContentLoaded", () => {
  bookid = window.location.href.split("=").pop();
  const bookClass = new Book();
  GetBookDetail(bookClass);

  InitializeEvents();
});

async function GetBookDetail(bookClass) 
{
  // console.log(bookid)
    const book      = await bookClass.SearchBookById(bookid);
    const coauthors = await bookClass.SearchBookCoauthors(bookid);
    const comments  = await bookClass.SearchBookComments(bookid);
    // console.log(comments);
    const bookdata  = BookDetail(book.data, coauthors.data);

    document.getElementById("book-detail").innerHTML = bookdata;
}

function InitializeEvents()
{
  document.getElementById("home").addEventListener("click", () => {
    window.location = "../index.php";
  });

  document.getElementById("read").addEventListener("click", () => {
    window.location = `pages_manager.php?bookid=${bookid}&mode=read`;
  });

  document.getElementById("modify").addEventListener("click", () => {
    window.location = `pages_manager.php?bookid=${bookid}&mode=upd`;
  });
}