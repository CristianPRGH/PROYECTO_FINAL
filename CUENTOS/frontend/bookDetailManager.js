import { Book } from "./Book.js";
import { BookDetail } from "../components/book_item.js";

document.addEventListener("DOMContentLoaded", () => {
  const bookClass = new Book();
  GetBookDetail(bookClass);
});

async function GetBookDetail(bookClass) 
{
    const bookid = window.location.href.split('=').pop();
    const book = await bookClass.SearchBookById(bookid);
    const bookdata = BookDetail(book.data[0]);

    document.getElementById("book-detail").innerHTML = bookdata;
}