import * as tweens from "../components/tweenControls.js";

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("book-cover-color").addEventListener('input', UpdateBookCoverColor);
    document.getElementById('select-cover-img').addEventListener('change', SetCoverImg);
    document.getElementById("remove-cover-img").addEventListener('click', RemoveCoverImg);
    document.getElementById("create-book").addEventListener('click', CreateBookDialog);
})

function UpdateBookCoverColor(event)
{
    const cover = document.getElementById("book-cover");
    if (cover) { cover.style.backgroundColor = event.target.value; }
}

function SetCoverImg(event)
{
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader(); // Crea un nuevo FileReader

        // Define una función que se ejecutará cuando el archivo se haya leído
        const coverimage = document.getElementById('book-cover-img');
        reader.onload = function(e) {
            // Cambia la fuente de la imagen de perfil a la URL de los datos leídos del archivo
            coverimage.src = e.target.result;
            tweens.PlayAnimation(gsap.to("#book-cover-img", {opacity:1}));
        }

        // Lee el archivo seleccionado como una URL de datos
        reader.readAsDataURL(event.target.files[0]);
    }
}

function RemoveCoverImg()
{
    const coverimage = document.getElementById('book-cover-img');
    tweens.PlayAnimation(gsap.to("#book-cover-img", {opacity:0}));
    coverimage.src = "";
}

function CreateBookDialog()
{
    const createBookDialog = document.getElementById("confirm-create-book");
    createBookDialog.showModal();

    document.getElementById("create-yes").addEventListener('click', ()=>{
        // TODO INSERTA EL LIBRO EN LA BASE DE DATOS
        createBookDialog.close()
        WriteBookDialog();
    })
    document.getElementById("create-no").addEventListener('click', ()=>{createBookDialog.close()})
}

function WriteBookDialog()
{
    const writeBookDialog = document.getElementById("confirm-write-book");
    writeBookDialog.showModal();

    document.getElementById("write-yes").addEventListener('click',()=>{
        // TODO IR A LA PAGINA PARA EMPEZAR A ESCRIBIR EL LIBRO
        writeBookDialog.close()
        window.location = "../pages/write_pages.html";
    })
    document.getElementById("write-no").addEventListener('click', ()=>{writeBookDialog.close()})
}