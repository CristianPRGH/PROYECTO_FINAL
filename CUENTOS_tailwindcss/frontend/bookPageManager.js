document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("prev-page").addEventListener('click', PageControl);
    document.getElementById("next-page").addEventListener('click', PageControl);
    // document.getElementById("confirm-pages").addEventListener('click', lalala);

    // <textarea id="" class="bg-transparent w-full h-full p-2 outline-none text-justify overflow-x-hidden resize-none placeholder:italic" maxlength="1650" placeholder="Escribe aquí...(max 300 palabras)"></textarea>
    const pagescontainer = document.getElementById("pages-container");
    for (let index = 0; index < 10; index++)
    {
        const newPage = `<textarea id="page-${index}" class="bg-transparent w-full h-full p-2 outline-none text-justify overflow-x-hidden resize-none placeholder:italic" maxlength="1650" placeholder="Escribe aquí...(max 300 palabras)"></textarea>`
        
        if (index != 0)
        {
            newPage.classList.add("hidden");
        }
        pagescontainer.innerHTML += newPage;
    }
})

function PageControl(event)
{
    
}