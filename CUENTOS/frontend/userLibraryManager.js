import { Book } from "./Book.js";
import { UserBookListItem } from "../components/book_item.js";
import * as tweens from "../components/tweenControls.js";

const tween_bookDialog = gsap.fromTo("#delete-book", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });
const bookclass = new Book();

document.addEventListener("DOMContentLoaded", async()=>{
    const userid = document.getElementById("user-id").textContent;
    const booklist = await bookclass.SearchUserBooks(userid);

    const container = document.getElementById("books-list");
    container.innerHTML = "";
    container.innerHTML = booklist.data.map(book => 
        UserBookListItem(book)
    ).join('');

    InitializeEvents();
})

function InitializeEvents()
{
    const deletebttns = document.getElementsByClassName("deletebook");
    Array.from(deletebttns).map(bttn => {
        bttn.addEventListener('click', OpenDeleteModal);
    })

    const editbookbttns = document.getElementsByClassName("editbook");
    Array.from(editbookbttns).map(bttn => {
        bttn.addEventListener('click', EditBook);
    })

    const editpagesbttns = document.getElementsByClassName("editpages");
    Array.from(editpagesbttns).map(bttn => {
        bttn.addEventListener('click', EditPages);
    })

    const readbttns = document.getElementsByClassName("readbook");
    Array.from(readbttns).map(bttn => {
        bttn.addEventListener('click', ReadBook);
    })

    const confirmDeleteBttns = document.getElementsByClassName("confirm-delete");
    Array.from(confirmDeleteBttns).map(bttn => {
        bttn.addEventListener('click', DeleteBook);
    })

    const cancelDeleteBttns = document.getElementsByClassName("cancel-delete");
    Array.from(cancelDeleteBttns).map(bttn => {
        bttn.addEventListener('click', ()=>{
            document.getElementById("confirm-delete").dataset.id = "";
            ToggleBookDetail(tween_bookDialog)
        });
    })
}

function OpenDeleteModal(event)
{
    ToggleBookDetail(tween_bookDialog);
    document.getElementById("confirm-delete").dataset.id = event.target.dataset.id
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

function ReadBook(e)
{
    const bookid = e.target.dataset.id;
    window.location.href = `pages_manager.php?bookid=${bookid}&user=${userid}&mode=read`;
}

function EditBook(e)
{
    const bookid = e.target.dataset.id;
    window.location.href = `create_book.php?bookid=${bookid}&mode=upd`;
}

function EditPages(e)
{
    const bookid = e.target.dataset.id;
    window.location.href = `pages_manager.php?bookid=${bookid}&user=${userid}&mode=upd`;
}

function DeleteBook(event)
{
    bookclass.DeleteBook(event.target.dataset.id);
    ToggleBookDetail(tween_bookDialog);
}