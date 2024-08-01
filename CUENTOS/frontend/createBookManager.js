import * as tweens from "../components/tweenControls.js";
import {ValidateInputs, ValidateOnServer} from "./formValidations.js";
import {InputJson, SetInputsToFormData} from "../components/inputsManager.js";

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeEvents();
    SetCategories();
    SetTags();
})

function InitializeEvents()
{
    document.getElementById("book-sinopsis").addEventListener('keyup', CountLetters);
    document.getElementById("book-categories").addEventListener('change', SetPages);
    document.getElementById("book-pages").addEventListener('input', (event)=>{
        SetPagesValue(event.target.value);
    });

    document.getElementById("home").addEventListener("click", () => {window.location = "../index.php";});
    document.getElementById("book-cover-color").addEventListener('input', UpdateBookCoverColor);
    document.getElementById("book-cover-color").addEventListener('input', UpdateBookCoverColor);
    document.getElementById('select-cover-img').addEventListener('change', SetCoverImg);
    document.getElementById("remove-cover-img").addEventListener('click', RemoveCoverImg);
    document.getElementById("create-book").addEventListener('click', CreateBookDialog);
}

async function SetCategories()
{
    try {
        const response = await fetch("../backend/includes/categories.getall.php");
        if (response.ok)
        {
          //selected disabled
          const result = await response.json();
          const select = document.getElementById("book-categories");

          result.data.map((category) => {
            const option = document.createElement("option");
            option.value = category.id;
            option.innerHTML = category.category;
            option.dataset.avgpages = category.avg_pages;
            select.appendChild(option);
          });
        }
    } catch (error) {
        console.error(error);
    }
}

async function SetTags()
{
    try {
        const response = await fetch("../backend/includes/tags.getall.php");
        if (response.ok)
        {
            const result = await response.json();
            const select = document.getElementById("tags-list");
            result.data.map(tag =>{
                // console.log(category);
                const option = document.createElement("option");
                option.value = tag.tag;
                select.appendChild(option);
            })
        }
    } catch (error) {
        console.error(error);
    }
}

function CountLetters(event)
{
    const text = event.target.value;
    document.getElementById("curr-letters").textContent = text.length;
}

function SetPages(event)
{
    const value = event.target.value;
    const inputpages = document.getElementById("book-pages");
    if (value == -1)
    {
        inputpages.value = "";
    }
    else{
        const selected = event.target.options[value];
        const pages = Math.round(selected.dataset.avgpages);
        inputpages.value = pages;
        SetPagesValue(pages)
    }
}

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

async function CreateBookDialog()
{
    // VALIDACIONES DE LOS CAMPOS
    let result = false;

    const inputs = [
        InputJson("book-title")
    ];

    const isvalid = await ValidateInputs(inputs);    // Valida en cliente

    //Si la validacion en cliente es correcta -> Valida en servidor
    if (isvalid)
    {
        const formdata = SetInputsToFormData(inputs);
        result = await ValidateOnServer(formdata);
   
        // Si la validacion en servidor es correcta -> Inserta libro
        if (result)
        {
            const createBookDialog = document.getElementById("confirm-create-book");
            createBookDialog.showModal();

            document.getElementById("create-yes").addEventListener('click', async ()=>{
                result = await InsertBook();

                createBookDialog.close();
                WriteBookDialog(result.lastid);
            })
            document.getElementById("create-no").addEventListener('click', ()=>{
                window.location = '../index.php';
            })
        }
    }
}


function WriteBookDialog(lastid)
{
    const writeBookDialog = document.getElementById("confirm-write-book");
    writeBookDialog.showModal();

    document.getElementById("write-yes").addEventListener('click',()=>{
        writeBookDialog.close();
        window.location = `pages_manager.php?bookid=${lastid}&mode=ins`;
    })
    document.getElementById("write-no").addEventListener('click', ()=>{
        window.location = '../index.php';
    })
}

function SetPagesValue(value)
{
    document.getElementById("curr-pages").textContent = value;
}




async function InsertBook()
{
    const formdata = new FormData();
    formdata.append("title",document.getElementById("book-title").value);
    formdata.append("sinopsis",document.getElementById("book-sinopsis").value);
    formdata.append("pages",document.getElementById("book-pages").value);
    formdata.append("category",document.getElementById("book-categories").value);
    formdata.append("tags",document.getElementById("book-tags").value);
    formdata.append("cover",document.getElementById("select-cover-img").files[0]);

    try {
        const response = await fetch("../backend/includes/book.insertbook.php",{
            method: "post",
            body: formdata
        })
        if (response.ok)
        {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }

    return false;
}