let bookDetailActive = false;
let books = null;

document.addEventListener('DOMContentLoaded', async () => {
    await GetBooks();
    SetupToggleMenus();
    SetupMainBooksList();
    SetupToggleBookDetail();

}); /* DOMContentLoaded */

 
async function GetBooks()
{
    try {
        const res = await fetch("../books.json");
        if (res.ok)
        {
            books = await res.json();
        }else {
            console.error('Error fetching books:', res.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


function SetupToggleMenus()
{
    /* -- Menus laterales -- */
    const menus = [
        {
            menu: document.getElementById("index-leftmenu"),
            toggle: document.getElementById("toggleLeftMenu"),
            active: false,
            tween: gsap.to("#index-leftmenu", { duration: 0.5, xPercent: 100, opacity: 1,ease: "sine.inOut", paused: true })
        },
        {
            menu: document.getElementById("index-rightmenu"),
            toggle: document.getElementById("toggleRightMenu"),
            active: false,
            tween: gsap.to("#index-rightmenu", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true })
        }
    ];

    menus.forEach(({ toggle, tween }, index) => {
        toggle.addEventListener('click', () => {
            menus[index].active = !menus[index].active;
            menus[index].active ? tween.play() : tween.reverse();
        });
    });
    /* ---------------- */
}

function ToggleBookDetail(toggle, tween)
{
    FillBookDetail(toggle);

    !bookDetailActive ? tween.play() : tween.reverse();
    bookDetailActive = !bookDetailActive;
}

function SetupToggleBookDetail()
{
    /* -- Botones para ver el detalle del libro -- */
    const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
    let toggleBookDetail = document.getElementsByClassName("book-details-toggle");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, bookDetailTween)});
    });
    /* ---------------- */
}

function SetupMainBooksList()
{
    const booksList = document.getElementById("books-list");

    booksList.innerHTML = books.map(book =>
        `<article class="book grid">
            <img class="book-cover" src="../images/book_covers/${book.properties.cover}">
            <div class="book-info flex-column">
                <p class="book-title">${book.properties.title}</p>
                <div class="book-authors flex-column">
                    <p class="book-author">
                        <svg class="book-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 1024">
                            <path d="M829.42,932.11c-.8.15-4.52.83-10.58,1.94-238.88,43.95-282.82,51.5-287.75,52.09-11.76,1.4-20.55.69-26.88-2.17-3.95-1.79-6.09-3.96-6.66-4.91.28-1.7,2.38-5.74,3.66-8.21,1.25-2.4,2.66-5.13,3.9-8.03,8.22-19.26,2.47-38.79-15.01-50.98-13.04-9.09-30.32-12.78-51.39-10.97-12.58,1.08-233.03,39.02-354.13,59.95l-59.44,47.98c138.62-24.02,402.7-69.5,416.59-70.88,12.41-1.07,22.1.55,28.01,4.67,3.44,2.4,3.1,3.19,2.19,5.31-.68,1.59-1.65,3.47-2.69,5.45-3.97,7.64-9.4,18.09-7.6,31.05,1.97,14.21,12.16,26.45,27.95,33.59,8.88,4.02,19.07,6.01,30.88,6.01,4.66,0,9.58-.31,14.77-.93,9.5-1.13,107.06-18.77,289.97-52.42,6.02-1.11,9.73-1.79,10.52-1.93,9.85-1.79,16.41-11.44,14.66-21.55-1.75-10.11-11.14-16.85-20.99-15.05Z"/>
                            <path d="M188.4,751.48l-153.82,165.17c-16.94,18.19-28.87,40.67-34.58,65.15l218.41-176.32c68.37,31.12,122.99,41.04,164.85,41.04,73.54,0,107.68-30.62,107.68-30.62-68.46-36.57-78.22-104.82-78.22-104.82,52.43,22.76,161.66,49.58,161.66,49.58,145.05-99.38,220.86-314.55,220.86-314.55-15.02,4.24-29.38,6-42.91,6-68.08,0-114.85-44.75-114.85-44.75l189.5-42.36C889.97,232.31,896,0,896,0L319.84,526.05c-65.25,59.57-111.13,138.26-131.44,225.44Z"/>
                        </svg>
                        ${book.properties.author.name}
                    </p>
                    <p class="book-coauthors">
                        <svg class="book-icon" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 1024">
                            <g>
                            <path d="M829.42,932.11c-.8.15-4.52.83-10.58,1.94-238.88,43.95-282.82,51.5-287.75,52.09-11.76,1.4-20.55.69-26.88-2.17-3.95-1.79-6.09-3.96-6.66-4.91.28-1.7,2.38-5.74,3.66-8.21,1.25-2.4,2.66-5.13,3.9-8.03,8.22-19.26,2.47-38.79-15.01-50.98-13.04-9.09-30.32-12.78-51.39-10.97-12.58,1.08-233.03,39.02-354.13,59.95l-59.44,47.98c138.62-24.02,402.7-69.5,416.59-70.88,12.41-1.07,22.1.55,28.01,4.67,3.44,2.4,3.1,3.19,2.19,5.31-.68,1.59-1.65,3.47-2.69,5.45-3.97,7.64-9.4,18.09-7.6,31.05,1.97,14.21,12.16,26.45,27.95,33.59,8.88,4.02,19.07,6.01,30.88,6.01,4.66,0,9.58-.31,14.77-.93,9.5-1.13,107.06-18.77,289.97-52.42,6.02-1.11,9.73-1.79,10.52-1.93,9.85-1.79,16.41-11.44,14.66-21.55-1.75-10.11-11.14-16.85-20.99-15.05Z"/>
                            <path d="M188.4,751.48l-153.82,165.17c-16.94,18.19-28.87,40.67-34.58,65.15l218.41-176.32c68.37,31.12,122.99,41.04,164.85,41.04,73.54,0,107.68-30.62,107.68-30.62-68.46-36.57-78.22-104.82-78.22-104.82,52.43,22.76,161.66,49.58,161.66,49.58,145.05-99.38,220.86-314.55,220.86-314.55-15.02,4.24-29.38,6-42.91,6-68.08,0-114.85-44.75-114.85-44.75l189.5-42.36C889.97,232.31,896,0,896,0L319.84,526.05c-65.25,59.57-111.13,138.26-131.44,225.44Z"/>
                            </g>
                            <path d="M430.5,168h-133c-9.66,0-17.5-7.84-17.5-17.5V17.5c0-9.66-7.84-17.5-17.5-17.5h-77c-9.66,0-17.5,7.84-17.5,17.5v133c0,9.66-7.84,17.5-17.5,17.5H17.5c-9.66,0-17.5,7.84-17.5,17.5v77c0,9.66,7.84,17.5,17.5,17.5h133c9.66,0,17.5,7.84,17.5,17.5v133c0,9.66,7.84,17.5,17.5,17.5h77c9.66,0,17.5-7.84,17.5-17.5v-133c0-9.66,7.84-17.5,17.5-17.5h133c9.66,0,17.5-7.84,17.5-17.5v-77c0-9.66-7.84-17.5-17.5-17.5Z"/>
                        </svg>
                        ${book.properties.coauthors.length}
                    </p>
                </div>
                <p class="book-pages"><i class="book-icon material-symbols-rounded">filter_1</i>${book.properties.pages}</p>
                <p class="book-tags"><i class="book-icon material-symbols-rounded">sell</i>${book.properties.tags}</p>
            </div>
            <i id="book-detail-book1" class="book-details-toggle material-symbols-rounded">chevron_right</i>
        </article>`
    ).join('');
}

async function FillBookDetail(toggle)
{
    const bookid = toggle.id.split('-').pop();
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO

    const book = books.find(book => book.properties.id.includes(bookid));

    if (book)
    {
        document.getElementById("book-detail-cover").src = `../images/book_covers/${book.properties.cover}`;
        document.getElementById("book-detail-title").textContent = book.properties.title;
        document.getElementById("book-detail-pages").textContent = `Páginas: ${book.properties.pages}`;
        document.getElementById("book-detail-sinopsis").textContent = book.properties.sinopsis;
        document.getElementById("book-detail-author-img").src = `../images/${book.properties.author.image}`;
        document.getElementById("book-detail-author-name").textContent = book.properties.author.name;
        let coauthorsList = document.getElementById("book-detail-coauthors-list");
        coauthorsList.innerHTML = book.properties.coauthors.map(coauthor =>
            `<div class="book-detail-coauthor flex-row">
                <img class="book-detail-author-img" src="../images/${coauthor.image}">
                <p class="book-detail-coauthor-name">${coauthor.name}</p>
            </div>`
        ).join('');
    }
}