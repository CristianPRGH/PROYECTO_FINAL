<?php

trait SaveImages{

    public function SaveImage($folder, $image, $prefix)
    {
        // Verifica si el directorio existe, si no, créalo
        if (!is_dir($folder)) {
            if (!mkdir($folder, 0777, true)) {
                return [false, ""]; // Falló al crear el directorio
            }
        }

        $imgname = $image["name"];
        $tmpname = $image["tmp_name"];
        $namesplit = explode('.', $imgname);
        $imgext    = array_pop($namesplit);

        $imagenewname = $prefix."image";
        $imagenewname = hash('sha256', $imagenewname).'.'.$imgext;

        $fullpath = $folder.$imagenewname;

        // Verifica si el archivo temporal existe
        if (!file_exists($tmpname)) {
            error_log("Temp file does not exist: $tmpname");
            return [false, ""];
        }

        if (move_uploaded_file($tmpname, $fullpath)) {
            
            return [true, $imagenewname];
        } else {
            error_log("Failed to move uploaded file");
        }

        return [false, ""];
    }
}