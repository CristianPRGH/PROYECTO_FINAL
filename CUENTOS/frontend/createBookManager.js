import * as tweens from "../components/tweenControls.js";
import {ValidateInputs, ValidateOnServer} from "./formValidations.js";
import {InputJson, SetInputsToFormData} from "../components/inputsManager.js";
import {NewTagInput} from "../components/tag_input.js";
import { Book } from "./Book.js";

const maxTagInputs = 6;
let tagInputsList = [];
let bookid, mode = null;  // Parametros en la URL
const tween_bookDialog = gsap.fromTo("#confirm-create-book", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });
const tween_writeDialog = gsap.fromTo("#confirm-write-book", { opacity: 0, scale: 0 }, { duration: 0.1, scale: 1, opacity: 1, paused: true });

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeEvents();
    SetCategories();
    SetTags();
    GetUrlParams();

    if (mode == "upd")
    {
        GetBookData();
    }
})

function InitializeEvents()
{
    document.getElementById("book-sinopsis").addEventListener('keyup', CountLetters);
    document.getElementById("book-categories").addEventListener('change', SetPages);

    [document.getElementById("book-pages"), document.getElementById("curr-pages")].forEach(element => {
        element.addEventListener('input', (e) => { SetPagesValue(e.target.value) });
    })
    
    document.getElementById("add-tag-input").addEventListener('click', AddNewTagInput);
    document.getElementById("rem-tag-input").addEventListener('click', RemoveTagInput);

    document.getElementById("home").addEventListener("click", () => {window.location = "../index.php";});
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
            option.value = category.UICategory;
            option.innerHTML = category.Name;
            option.dataset.avgpages = category.Avg_pages;
            select.appendChild(option);
          });
        }
    } catch (error) {
        console.error(error);
    }
}


function GetUrlParams() {
    // Obtiene los parametros en la URL
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    mode   = urlParams.get("mode");
    bookid = urlParams.get("bookid");
}


//#region Tags control

async function SetTags() {
    try {
        const response = await fetch("../backend/includes/tags.getall.php");
        if (response.ok) {
            const result = await response.json();
            const select = document.getElementById("tags-list");
            result.data.map(tag => {
                // console.log(category);
                const option = document.createElement("option");
                option.value = tag.Name;
                select.appendChild(option);
            })
        }
    } catch (error) {
        console.error(error);
    }
}

function AddNewTagInput(isInsert = true)
{
    UpdateTagsJson(); // Actualiza el Json de tags
    const tagsCount = GetTagsCount();
    let addNewTag = true;

    if (isInsert && tagsCount > 0)
    {
        const lastValue = tagInputsList[tagsCount - 1][1];
        if (lastValue.length === 0) addNewTag = !addNewTag;
    }

    if (addNewTag)
    {
        document.getElementById("rem-tag-input").style.display = "block";   // Si hay mas de dos inputs muestra el icono de "quitar input"
        
        // Si hay menos inputs que el máximo establecido:
        if (tagsCount < maxTagInputs)
        {
            const tagsContainer = document.getElementById("book-tags"); // Recoge el contenedor de tags
            const tagid = `tag_${tagsCount + 1}`;                       // Suma 1 a la cantidad de inputs para sacar el siguiente ID
            const tagInput = NewTagInput(tagid);                        // Llama a la funcion externa que devuelve un nuevo tag                      

            const tempDiv = document.createElement('div');              // Genera un elemento Div para contener el input
            tempDiv.innerHTML = tagInput.trim();                        // Añade el input al elemento Div
            tagsContainer.appendChild(tempDiv);                         // Añade el Div al contenedor
            UpdateTagsJson();                                           // Actualiza el Json de tags
        }
    }
}

function RemoveTagInput()
{
    const lastTagAdded = tagInputsList.pop();                       // Obtiene el último elemento de la lista de tags
    const tagInputById = document.getElementById(lastTagAdded[0]);  // Obtiene el input mediante el ID
    tagInputById.parentNode.remove();                               // Elimina el padre (Div) del elemento tag

    const tagsCount = GetTagsCount();
    if (tagsCount < 1) document.getElementById("rem-tag-input").style.display = "none";
}

function GetTagsCount()
{
    return tagInputsList.length;
}

function UpdateTagsJson()
{
    tagInputsList = []
    Array.from(document.getElementsByClassName("book-tag")).map(tag => {
        tagInputsList.push([ tag.id, tag.value]);
    })
}

//#endregion

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
        inputpages.value = "1";
    }
    else{
        const selected = event.target.options[event.target.selectedIndex];
        const pages = Math.round(selected.dataset.avgpages);
        inputpages.value = pages;
        SetPagesValue(pages)
    }
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
            const dialog = document.getElementById("confirm-create-book");
            tweens.PlayAnimation(tween_bookDialog);
            dialog.showModal();


            document.getElementById("create-yes").addEventListener('click', async ()=>{
                result = await InsertBook();

                dialog.close();
                WriteBookDialog(bookid != null ? bookid : result.lastid);
            })

            document.getElementById("create-no").addEventListener('click', ()=>{
                // window.location = '../index.php';
                tweens.ReverseAnimation(tween_bookDialog);
                dialog.close();
            })
        }
    }
}


function WriteBookDialog(lastid)
{
    const writeBookDialog = document.getElementById("confirm-write-book");
    tweens.PlayAnimation(tween_writeDialog);
    writeBookDialog.showModal();

    document.getElementById("write-yes").addEventListener('click',()=>{
        writeBookDialog.close();
        window.location = `pages_manager.php?bookid=${lastid}&mode=ins`;
    })
    document.getElementById("write-no").addEventListener('click', ()=>{
        window.location = '../index.php';
    })
}

const minPages = 1, maxpages = 500;
function SetPagesValue(value)
{
    if (value >= minPages && value <= maxpages)
    {
        document.getElementById("curr-pages").value = value;
        document.getElementById("book-pages").value = value;
        document.getElementById("curr-pages").style.border = "transparent";
    }
    else{
        document.getElementById("curr-pages").style.border = "solid 1px red";
    }
}



function InsertBook()
{
    const book = new Book();
    const formdata = new FormData();
    formdata.append("action", mode == "upd" ? "updateBook" : "insertNewBook");
    formdata.append("bookid",bookid);
    formdata.append("title",document.getElementById("book-title").value);
    formdata.append("sinopsis",document.getElementById("book-sinopsis").value);
    formdata.append("pages",document.getElementById("book-pages").value);
    formdata.append("category",document.getElementById("book-categories").value);

    let tagsValues = [];
    Array.from(document.getElementsByClassName("book-tag")).map(tag => {
        tagsValues.push(tag.value);
    })
    const tagsString = tagsValues.join(',');
    formdata.append("tags", tagsString);

    const file = document.getElementById("select-cover-img").files[0];
    if (file != undefined) 
    {
        formdata.append("cover", file);
    }else{
        const imageFile = document.getElementById("book-cover-img").getAttribute("src");
        if (imageFile.length > 0)
        {
            formdata.append("cover", imageFile);
        }else
        {
            formdata.append("cover", "NULL");
        }
    }

    return book.InsertBook(formdata);
}

async function GetBookData()
{
    const book = new Book();
    const result = await book.SearchBookById(bookid);
    FillInputs(result.data);
}

function FillInputs(book)
{
    document.getElementById("book-title").value = book.Title;
    document.getElementById("book-sinopsis").value = book.Sinopsis;
    document.getElementById("book-categories").value = book.UICategory;
    document.getElementById("book-pages").value = book.Pages;
    const tags = book.Tags.split(',');
    for (let index = 0; index < tags.length; index++) {
        AddNewTagInput(false);        
    }
    tagInputsList.map((tag, index) => {
        document.getElementById(tag[0]).value = tags[index];
    })
    const imageroute = `../images/books_covers/${book.Cover}`;
    document.getElementById("book-cover-img").src = imageroute;
    document.getElementById("book-cover-img").style.opacity = 1;
    SetPagesValue(book.Pages);
}