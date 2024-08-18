import { Book } from "./Book.js";
import { UserBookListItem } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";

const tween_bookDialog = gsap.fromTo("#delete-book", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });

document.addEventListener("DOMContentLoaded", async()=>{
    const userid = document.getElementById("user-id").textContent;
    const bookclass = new Book();
    const booklist = await bookclass.SearchUserBooks(userid);

    const container = document.getElementById("books-list");
    container.innerHTML = "";
    container.innerHTML = booklist.data.map(book => UserBookListItem(book)).join('');

    const deletebttns = document.getElementsByClassName("delete");
    Array.from(deletebttns).map(bttn => {
        bttn.addEventListener('click', OpenDeleteModal);
    })
})

function OpenDeleteModal(event)
{
    ToggleBookDetail(tween_bookDialog);

    const id = event.target.dataset.id;
    document.getElementById("det-bookId").textContent = id;

    document.getElementById("confirm-delete").addEventListener('click', DeleteBook);
    document.getElementById("cancel-delete").addEventListener('click', ()=>{
        ToggleBookDetail(tween_bookDialog);
    });
}

// ACTIVA/DESACTIVA LA PANTALLA DEL DETALLE DEL LIBRO
let bookDetailActive = false;
async function ToggleBookDetail(tween)
{
    const dialog = document.getElementById("delete-book");
    !bookDetailActive ? tweens.PlayAnimation(tween) : tweens.ReverseAnimation(tween);
    !bookDetailActive ? dialog.showModal() : dialog.close();

    bookDetailActive = !bookDetailActive;
}

function DeleteBook()
{
    ToggleBookDetail(tween_bookDialog);
}