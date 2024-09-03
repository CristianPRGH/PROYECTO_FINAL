export class Book {

  //#region Search
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

  async SearchBookCoauthors(id) 
  {
    const formdata = new FormData();
    formdata.append("action", "getBookCoauthors");
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

  async SearchUserBooks(id) {
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

  async SearchBookPages(bookid) {
    const formdata = new FormData();
    formdata.append("action", "getBookPages")
    formdata.append("bookid", bookid);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata,
      });
      if (response.ok) {
        const result = await response.json();
        return result.data.pages;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async SearchBookComments(bookid){
    const formdata = new FormData();
    formdata.append("action", "getBookComments")
    formdata.append("bookid", bookid);
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/CommentsHandler.php", {
        method: "post",
        body: formdata,
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region Insert
  async InsertBook(formdata) {
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
      })
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async InsertComment(formdata)
  {
    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/CommentsHandler.php", {
        method: "post",
        body: formdata
      })
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region Delete
  async DeleteBook(bookid) {
    const formdata = new FormData();
    formdata.append("action", "deleteBookById");
    formdata.append("bookid", bookid);

    try {
      const response = await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata,
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }
  //#endregion

  //#region Update
  async UpdateViews(bookid)
  {
    const formdata = new FormData();
    formdata.append("action", "updateViews");
    formdata.append("bookid", bookid);
    try {
      await fetch("/MySites/PROYECTO_FINAL/CUENTOS/backend/includes/BookHandler.php", {
        method: "post",
        body: formdata
      });
      // const result = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  //#endregion
}