let numPages = 1;     // Numero de páginas seleccionadas por el usuario
let currentPage = 1;    // Página actual
const pagesContent = {} // Contenido de las páginas
let quill = null;
let bookid;

document.addEventListener("DOMContentLoaded", async ()=>{
    document.getElementById("prev").addEventListener('click', PageControl);
    document.getElementById("next").addEventListener('click', PageControl);
    document.getElementById("confirm").addEventListener('click', ConfirmPages);

    bookid = document.getElementById("bookid").textContent;
    await GetBookPages();
    InitializeQuill();
    LoadPage();
    SetPages();
})


function InitializeQuill() {
  quill = new Quill("#editor", {
    // readOnly: true,
    // modules: {
    //     toolbar: null
    //   },
    modules: {
      syntax: true,
      toolbar: "#toolbar-container",
    },
    placeholder: "Empieza a escribir...",
    theme: "snow",
  });
}

function SavePage(pageNumber)
{
    const content = GetQuillContent();
    pagesContent[pageNumber] = content;

    return content;
}

function LoadPage(pageNumber)
{
    const pageContent = pagesContent[pageNumber];
    quill.setContents(pageContent);
}



function PageControl(event)
{
    SavePage(currentPage);
    quill.focus();

    const direction = event.target.id;
    if (direction === "next" && currentPage < numPages)
    {
        currentPage++;
    } else if (direction === "prev" && currentPage > 1)
    {
        currentPage--;
    }

    LoadPage(currentPage);
    SetPages();
}

function SetPages()
{
    document.getElementById("prev-page").textContent = currentPage > 1 ? currentPage - 1 : "";
    document.getElementById("current-page").innerHTML = `<strong>${currentPage}</strong>`;
    document.getElementById("next-page").textContent = currentPage < numPages ? currentPage + 1 : "";
}




function ConfirmPages()
{    
    SavePage(currentPage);
    

    const modal = document.getElementById("confirm-pages");
    modal.showModal();

    document.getElementById("write-yes").addEventListener('click', async ()=>{
        await InsertPages();

        // window.location = "../index.html";
    })

    document.getElementById("write-no").addEventListener('click', ()=>{
        modal.close();
    })
}

function GetQuillContent()
{
    return quill.getContents();
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

async function InsertPages()
{
    try {
        const formdata = new FormData();
        formdata.append("content", JSON.stringify(pagesContent));
        formdata.append("bookid", bookid);

        const response = await fetch("../backend/includes/pages.insertpages.php",{
            method:"post",
            body:formdata
        });

        if (response.ok)
        {
            const result = await response.json();
        }
    } catch (error) {
        console.log(error);
    }
}
