const numPages = 100;   // Numero de páginas seleccionadas por el usuario
let currentPage = 1;    // Página actual
const pagesContent = {} // Contenido de las páginas
let quill = null;

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("prev").addEventListener('click', PageControl);
    document.getElementById("next").addEventListener('click', PageControl);
    document.getElementById("confirm").addEventListener('click', ConfirmPages);

    InitializeQuill();
    LoadPage();
    SetPages();
})

function PageControl(event)
{
    SavePage(currentPage);

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

function SavePage(pageNumber)
{
    const content = GetQuillContent();
    pagesContent[pageNumber] = content;
}

function LoadPage(pageNumber)
{
    const content = pagesContent[pageNumber];
    quill.setContents(content);
}

function InitializeQuill()
{
    quill = new Quill('#editor', {
        // readOnly: true,
        // modules: {
        //     toolbar: null
        //   },
        modules: {
            syntax: true,
            toolbar: '#toolbar-container',
          },
        placeholder: 'Empieza a escribir...',
        theme: 'snow'
    });
}

function ConfirmPages()
{    
    SavePage(currentPage);
    console.log(pagesContent);

    const modal = document.getElementById("confirm-pages");
    modal.showModal();

    document.getElementById("write-yes").addEventListener('click', ()=>{
        window.location = "../index.html";
    })

    document.getElementById("write-no").addEventListener('click', ()=>{
        modal.close();
    })
}

function GetQuillContent()
{
    return quill.getContents();
}



// function GetContent(quill)
// {
//     const newPage = {
//         id:"page-1",
//         content:""
//     }

//     const length = quill.getLength();
//     newPage.content = quill.getContents();
//     console.log(newPage);

//     quill.deleteText(0, length);

//     quill.setContents(newPage.content);
// }
