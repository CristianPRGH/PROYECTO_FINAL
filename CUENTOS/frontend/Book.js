export class Book {

  // FUNCIONES
  // OBTIENE LA LISTA DE LIBROS
  async SearchAllBooks() {
    const formdata = new FormData();
    formdata.append("action", "getBooksList");

    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error fetching books:", response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async SearchMostReadBooks() {
    const formdata = new FormData();
    formdata.append("action", "getMostReadBooks");
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error fetching books:", response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async SearchBookById(id) {
    const formdata = new FormData();
    formdata.append("action", "getBookById");
    formdata.append("bookid", id);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
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

  async SearchBooksByFilters(name_author, tags) {
    const formdata = new FormData();
    formdata.append("action", "getBooksByFilters");
    formdata.append("name_author", name_author);
    formdata.append("tags", tags);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
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

  async SearchBookContent(id) {
    const formdata = new FormData();
    formdata.append("action", "getBookContent");
    formdata.append("bookid", id);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata,
      }
      );

      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error fetching books:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  async SearchUserBooks(id)
  {
    const formdata = new FormData();
    formdata.append("action", "getBooksByUser");
    formdata.append("userid", id);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata,
      }
      );

      if (response.ok) {
        return await response.json();
      } else {
        console.error("Error fetching books:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
}