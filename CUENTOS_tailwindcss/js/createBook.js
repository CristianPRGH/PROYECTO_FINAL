import * as tweens from "../components/tweenControls.js";

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("book-cover-color").addEventListener('input', UpdateBookCoverColor);
    document.getElementById('select-cover-img').addEventListener('change', SetCoverImg);
    document.getElementById("remove-cover-img").addEventListener('click', RemoveCoverImg);
    document.getElementById("create-book").addEventListener('click', InitCreateBook);
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

function InitCreateBook()
{
    console.log("hola");
    tweens.PlayAnimation(gsap.to("#confirm-create-book", {y:-100, opacity:1}));
}