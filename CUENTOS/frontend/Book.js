export class Book{

    booksList = null;

    constructor(coverimg = "", covercolor = "", author = "", pages = "", tags = "", sinopsis = "")
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
            const response = await fetch("backend/includes/book.getbookslist.php"); //("books.json");
            if (response.ok) {
              this.booksList = await response.json();
            } else {
              console.error("Error fetching books:", response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }


    async SearchBookById(id)
    {
        const formdata = new FormData();
        formdata.append("bookid", id);
        try {
          const response = await fetch("backend/includes/book.getbookbyid.php",{
            method:"post",
            body:formdata
          });

          if (response.ok) {
            return await response.json();
          } else {
            console.error("Error fetching books:", response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
    }

    GetBooks()
    {
        return this.booksList.data;
    }
}