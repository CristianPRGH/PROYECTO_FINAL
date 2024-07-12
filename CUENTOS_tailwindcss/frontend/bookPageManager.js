document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("prev-page").addEventListener('click', PageControl);
    document.getElementById("next-page").addEventListener('click', PageControl);
    // document.getElementById("confirm-pages").addEventListener('click', lalala);

    // <textarea id="" class="bg-transparent w-full h-full p-2 outline-none text-justify overflow-x-hidden resize-none placeholder:italic" maxlength="1650" placeholder="Escribe aquí...(max 300 palabras)"></textarea>
    // const pagescontainer = document.getElementById("pages-container");
    // for (let index = 0; index < 10; index++)
    // {
        
    //     // if (index != 0)
    //     // {
    //     //     newPage.classList.add("hidden");
    //     // }
    // }
    // const newPage = `<textarea id="page-${index}" class="bg-transparent w-full h-full p-2 outline-none text-justify overflow-x-hidden resize-none placeholder:italic" maxlength="1650" placeholder="Escribe aquí...(max 300 palabras)"></textarea>`
    // pagescontainer.innerHTML = newPage;

    const quill = new Quill('#editor', {
        theme: 'snow'
    });
})

function PageControl(event)
{
    
}