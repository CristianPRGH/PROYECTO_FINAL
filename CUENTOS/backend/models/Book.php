<?php

class Book extends Basemodel{
    private $table = "books";

    
    protected function InsertBook($values)
    {
        $query = "INSERT INTO $this->table 
        (UIBook, Title, Sinopsis, Pages, UICategory, Tags, Cover, UIUser) 
        VALUES (UUID(),?,?,?,?,?,?,?)";
        return parent::InsertRows($query, $values);
    }

    protected function UpdateBook($values)
    {
        $query = "UPDATE $this->table 
        SET Title = ?, Sinopsis = ?, Pages = ?, UICategory = ?, Tags = ?, Cover = ?
        WHERE UIUser = ? AND UIBook = ?";
        return parent::UpdateRows($query, $values);
    }

    protected function SelectBookPages($values)
    {
        $query = "SELECT Pages
        FROM $this->table 
        WHERE UIBook = ?";
        return parent::SelectOne($query, [$values]);
    }

    protected function SelectBooks()
    {
        $query = 
        "SELECT B.UIBook, B.Title, B.Cover, B.Views, U.Username, U.Image as userimg 
        FROM $this->table B
        JOIN users U ON U.UIUser = B.UIUser
        ORDER BY B.Created_at DESC";
        return parent::SelectAll($query);
    }

    protected function SelectMostReadBooks()
    {
        $query = 
        "SELECT B.UIBook, B.Title, B.Cover, B.Views, U.Username, U.Image as userimg 
        FROM $this->table B
        JOIN users U ON U.UIUser = B.UIUser
        WHERE B.Views > 0
        ORDER BY B.Views DESC
        LIMIT 10";
        return parent::SelectAll($query);
    }

    protected function SelectBookById($values)
    {
        $query = "SELECT B.*, U.username, U.image as userimg, AVG(BC.Rating) AS Rating
        FROM books B
        JOIN users U ON U.UIUser = B.UIUser
        LEFT JOIN (SELECT *
		    FROM comments) AS BC
		ON BC.UIBook = B.UIBook
        WHERE B.UIBook = ?";

        return parent::SelectOne($query, [$values]);
    }

    protected function SelectBookCoauthors($values)
    {
        $query =  "SELECT DISTINCT U.Username, U.Image
                    FROM books B
                    JOIN pages P ON B.UIBook = P.UIBook
                    JOIN users U ON B.UIUser = P.UIUser
                    WHERE B.UIBook = ? AND P.UIUser <> B.UIUser";
        return parent::SelectAll($query, [$values]);
    }

    protected function SelectBooksByFilters($title, $tags)
    {
        $params = [];
        $query =
        "SELECT B.*
        FROM $this->table B
        JOIN users U ON U.UIUser = B.UIUser
        WHERE 1=1";
        // -- WHERE (? IS NOT NULL AND (bk_title LIKE ? OR us.username LIKE ?))";

        if (!empty(trim($title)))
        {
            $nameFilter  = '%' . trim($title) . '%';
            $query .= " AND (Title LIKE ? OR U.Username LIKE ?)";
            $params = [$nameFilter, $nameFilter];
        }


        if (!empty(trim($tags)))
        {
            $tagsarray = explode(',', $tags);
            $tagFilters = [];

            foreach ($tagsarray as $tag)
            {
                // Sanitizar el valor del tag si es necesario
                if (!empty(trim($tag))) {
                    $tagFilters[] = "FIND_IN_SET(?, B.Tags) > 0";
                }
            }

            if (count($tagFilters) > 0) {
                // Unir las condiciones de tags usando OR o AND, dependiendo de la lógica requerida
                $query .= count($params) > 0 ? " OR (" . implode(" OR ", $tagFilters) . ")" : " AND (" . implode(" OR ", $tagFilters) . ")";
            }

            // Preparar los valores para los parámetros de la consulta
            $params = array_merge($params, $tagsarray);
        }

        // print_r($params);
        // echo $query;

        // Ejecutar la consulta con los parámetros preparados
        return parent::SelectAll($query, $params);
    }

    protected function SelectBooksByuser($values)
    {
        $query = "SELECT * 
        FROM $this->table 
        WHERE UIUser = ?";
        return parent::SelectAll($query, [$values]);
    }

    protected function UpdateBookViews($values)
    {
        $query = "UPDATE $this->table 
        SET Views = Views + 1 
        WHERE UIBook = ?";
        parent::UpdateRows($query, [$values]);
    }

    protected function DeleteBook($values)
    {
        $query = "DELETE 
                FROM $this->table 
                WHERE UIBook = ?";
        return parent::DeleteRows($query, [$values]);
    }
}