<?php

class Book extends Basemodel{
    private $table = "books";

    protected function InsertBook($values)
    {
        $query = "INSERT INTO $this->table (bk_title, bk_sinopsis, bk_pages, bk_categoryid, bk_tags, bk_cover, bk_authorid) VALUES (?,?,?,?,?,?,?)";
        return parent::InsertRows($query, $values);
    }

    protected function SelectBookPages($id)
    {
        $query = "SELECT bk_pages as pages FROM $this->table WHERE id = ?";
        return parent::SelectOne($query, [$id]);
    }

    protected function SelectBooks()
    {
        $query = 
        "SELECT bk.id, bk.bk_title, bk.bk_cover, bk.bk_views, users.username, users.image as userimg FROM $this->table AS bk
        JOIN users ON users.id = bk.bk_authorid
        ORDER BY bk.bk_created_at DESC";
        return parent::SelectAll($query);
    }

    protected function SelectMostReadBooks()
    {
        $query = 
        "SELECT bk.id, bk.bk_title, bk.bk_cover, bk.bk_views, users.username, users.image as userimg FROM $this->table AS bk
        JOIN users ON users.id = bk.bk_authorid
        WHERE bk.bk_views > 0
        ORDER BY bk.bk_views DESC
        LIMIT 10";
        return parent::SelectAll($query);
    }

    protected function SelectBookById($bookid)
    {
        $query =
            "SELECT books.*, users.username, users.image as userimg FROM $this->table AS books
            JOIN users ON users.id = books.bk_authorid
            WHERE books.id = ?";
        return parent::SelectOne($query, [$bookid]);
    }

    protected function SelectBooksByFilters($title, $tags)
    {
        $params = [];
        $query =
        "SELECT bk.*
        FROM $this->table AS bk
        JOIN users AS us ON us.id = bk.bk_authorid
        WHERE 1=1";
        // -- WHERE (? IS NOT NULL AND (bk_title LIKE ? OR us.username LIKE ?))";

        if (!empty(trim($title)))
        {
            $nameFilter  = '%' . trim($title) . '%';
            $query .= " AND (bk_title LIKE ? OR us.username LIKE ?)";
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
                    $tagFilters[] = "FIND_IN_SET(?, bk.bk_tags) > 0";
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

    protected function UpdateBookViews($id)
    {
        $query = "UPDATE $this->table SET bk_views = bk_views + 1 WHERE id = ?";
        parent::UpdateRows($query, [$id]);
    }

    protected function SelectBooksByuser($userid)
    {
        $query = "SELECT * FROM $this->table WHERE bk_authorid = ?";
        return parent::SelectAll($query, [$userid]);
    }
}