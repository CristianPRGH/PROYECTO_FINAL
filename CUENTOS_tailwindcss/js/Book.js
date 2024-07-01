export class Book{

    booksList = null;

    constructor(coverimg, covercolor, author, pages, tags, sinopsis)
    {
        this.coverimg = coverimg;
        this.covercolor = covercolor;
        this.author = author;
        this.pages = pages;
        this.tags = tags;
        this.sinopsis = sinopsis;
    }

    // FUNCIONES
    // OBTIENE LA LISTA DE LIBROS
    async SearchAllBooks()
    {
        try {
            const res = await fetch("../books.json");
            if (res.ok)
            {
                this.booksList = await res.json();
            }else {
                console.error('Error fetching books:', res.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    GetBooks()
    {
        return this.booksList;
    }
}