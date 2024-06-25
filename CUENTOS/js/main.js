let bookDetailActive = false;
let books = null;

document.addEventListener('DOMContentLoaded', () => {
    
    GetBooks();

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
    
    /* -- Botones para ver el detalle del libro -- */
    const bookDetailTween = gsap.to("#book-details", { duration: 0.5, xPercent: -100, opacity: 1, ease: "sine.inOut", paused: true });
    let toggleBookDetail = document.getElementsByClassName("book-details-toggle");
    Array.from(toggleBookDetail).forEach((toggle)=>{
        toggle.addEventListener('click', ()=> {ToggleBookDetail(toggle, bookDetailTween)});
    });
    /* ---------------- */
});

function ToggleBookDetail(toggle, tween)
{
    FillBookDetail(toggle);

    !bookDetailActive ? tween.play() : tween.reverse();
    bookDetailActive = !bookDetailActive;
}

async function FillBookDetail(toggle)
{
    const bookid = toggle.id.split('-');
    // BUSCAR LA INFORMACION DEL LIBRO EN LA LISTA DE LIBROS OBTENIDA DEL SERVIDOR MEDIANTE EL ID DEL LIBRO

    books.forEach(book =>{
        console.log(book.properties.id.includes(bookid.pop()));
    })
    // const book = books.filter(book => book.properties.id.includes(bookid));
    // console.log(book);
}

async function GetBooks()
{
    try {
        const res = await fetch("../books.json");
        if (res.ok)
        {
            books = await res.json();
        }
    } catch (error) {
        console.error(error);
    }

    console.log(books);
}