import { Book } from "../frontend/Book.js";

const pagesContent = {};  // Contenido de las páginas y el usuario que la ha escrito
let quill = null;         // Objeto que contiene el editor Quill
let numPages = 1;         // Numero de páginas del libro
let currentPage = 1;      // Página actual
let bookid, mode, userid = null;  // Parametros en la URL
const quillOptionsReadOnly = {readOnly: true,modules: {toolbar: null,}, theme: "bubble",};
const quillOptionsModify = {modules: {syntax: true,toolbar: "#toolbar-container",}, placeholder: "Cada palabra es un paso hacia una gran historia...", theme: "snow",};

document.addEventListener("DOMContentLoaded", async () => {
  // Make the DIV element draggable:
  Draggable.create("#menu", {
    bounds: document.getElementById("main"),
    onDragStart: function () {
      gsap.to("#" + this.target.id, { opacity: 0.3 }).play();
    },
    onDragEnd: function () {
      gsap.to("#" + this.target.id, { opacity: 1 }).play();
    },
  });


  GetUrlParams();

  switch (mode) {
    case "ins":
      await GetBookPages();
      InitializeQuill(quillOptionsModify);
      break;
    case "read":
      await GetBookContent();
      InitializeQuill(quillOptionsReadOnly);
    break;
    default:
      await GetBookPages();
      await GetBookContent();
      InitializeQuill(quillOptionsModify);
      break;
  }

  InitializeEvents();
  SetPages();
  LoadPage(currentPage);
});

function GetUrlParams(){
  // Obtiene los parametros en la URL
  const urlString = window.location.search;
  const urlParams = new URLSearchParams(urlString);
  mode = urlParams.get("mode");
  bookid = urlParams.get("bookid");
  userid = document.getElementById("userid").textContent;
}

function InitializeEvents() {
  Array.from(document.querySelectorAll(".home")).map((bttn) => {
    bttn.addEventListener("click", () => {
      window.location = "../index.php";
    });
  });
  Array.from(document.querySelectorAll(".prev, .next")).map((bttn) => {
    bttn.addEventListener("click", PageControl);
  });

  if (mode == "ins" || mode == "upd")
    document.getElementById("confirm").addEventListener("click", ConfirmPages);
}

function InitializeQuill(options) {
  quill = new Quill('#editor', options);
}

// GUARDA EL CONTENIDO DE LA PÁGINA
function SavePage(content = null, userid, pageNumber) {
  if (content == null) content = GetQuillContent();          // OBTIENE EL CONTENIDO DE LA PÁGINA ACTUAL
  const pageIsEmpty = CheckIsEmpty(content);                 // VERIFICA SI ESTÁ VACÍA O NO

  pagesContent[pageNumber] = {                               // GUARDA EL CONTENIDO Y EL USUARIO
    content:content,
    userid:userid
  };

  return pageIsEmpty;
}

// CARGA EL CONTENIDO EN EL EDITOR
function LoadPage(pageNumber) {
  const pageContent = pagesContent[pageNumber].content; // OBTIENE EL CONTENIDO DE LA PÁGINA SELECCIONADA
  quill.setContents(pageContent);                       // MUESTRA EL CONTENIDO EN EL EDITOR

  if (userid == pagesContent[pageNumber].userid)
  {
    InitializeQuill(quillOptionsModify);
  }
  else{
    InitializeQuill(quillOptionsReadOnly);
  }
}

function PageControl(event) {
  let pageIsEmpty = false;
  if (mode == "ins" || mode == "upd") {
    pageIsEmpty = SavePage(null, userid, currentPage);
    quill.focus();
  }

  const direction = event.target.dataset.dir;
  if (direction === "next" && currentPage < numPages && !pageIsEmpty) {
    currentPage++;
  } else if (direction === "prev" && currentPage > 1) {
    currentPage--;
  }

  LoadPage(currentPage);
  SetPages();
}

function SetPages() {
  document.getElementById("prev-page").textContent  = currentPage > 1 ? currentPage - 1 : "";
  document.getElementById("current-page").innerHTML = `<strong>${currentPage}</strong>`;
  document.getElementById("next-page").textContent  = currentPage < numPages ? currentPage + 1 : "";
}

function ConfirmPages() {
  SavePage(currentPage);

  const modal = document.getElementById("confirm-pages");
  modal.showModal();

  document.getElementById("write-yes").addEventListener("click", async () => {
    await InsertPages();

    window.location = "../index.php";
  });

  document.getElementById("write-no").addEventListener("click", () => {
    modal.close();
  });
}

function GetQuillContent() {
  return quill.getContents();
}

// Check del contenido de la página; Retorna TRUE si hay contenido y FALSE si está vacío (solo hay un "\n" por defecto)
function CheckIsEmpty(content) {
  const pageContent = content["ops"][0]["insert"];
  return pageContent == "\n";
}





async function GetBookPages() {
  const formdata = new FormData();
  formdata.append("bookid", bookid);
  try {
    const response = await fetch("../backend/includes/book.getbookpages.php", {
      method: "post",
      body: formdata,
    });
    if (response.ok) {
      const result = await response.json();
      numPages = result.data.pages;
    }
  } catch (error) {
    console.log(error);
  }
}

async function InsertPages() {
  try {
    const formdata = new FormData();
    formdata.append("content", JSON.stringify(pagesContent));
    formdata.append("bookid", bookid);

    const response = await fetch("../backend/includes/pages.insertpages.php", {
      method: "post",
      body: formdata,
    });

    if (response.ok) {
      const result = await response.json();
      console.table(result);
    }
  } catch (error) {
    console.log(error);
  }
}

async function GetBookContent() {
  const bookClass = new Book();
  const content = await bookClass.SearchBookContent(bookid);
  console.log(content);
  content.data.map((page, index) =>{
    const parsedContent = JSON.parse(page.pg_content);
    const authorid = page.pg_authorid;
    SavePage(parsedContent, authorid, index + 1);
  });

  if (mode == "read") numPages = content.data.length;
}
