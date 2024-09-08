<?php
// Registra la función "LoadDatabase" en la cola de funciones autoload.
spl_autoload_register("LoadDatabase");

// Registra la función "LoadModels" en la cola de funciones autoload.
spl_autoload_register("LoadModels");

// Registra la función "LoadControllers" en la cola de funciones autoload.
spl_autoload_register("LoadControllers");

// Registra la función "LoadServices" en la cola de funciones autoload.
spl_autoload_register("LoadServices");

/**
 * Función que se ejecuta automáticamente para cargar clases de la carpeta "database".
 *
 * @param string $classname El nombre de la clase que se está intentando cargar.
 */
function LoadDatabase($classname)
{
    // Llama a la función Load pasando el nombre de la clase y el tipo "database".
    Load($classname, "database");
}

/**
 * Función que se ejecuta automáticamente para cargar clases de la carpeta "models".
 *
 * @param string $classname El nombre de la clase que se está intentando cargar.
 */
function LoadModels($classname)
{
    // Llama a la función Load pasando el nombre de la clase y el tipo "models".
    Load($classname, "models");
}

/**
 * Función que se ejecuta automáticamente para cargar clases de la carpeta "controllers".
 *
 * @param string $classname El nombre de la clase que se está intentando cargar.
 */
function LoadControllers($classname)
{
    // Llama a la función Load pasando el nombre de la clase y el tipo "controllers".
    Load($classname, "controllers");
}

/**
 * Función que se ejecuta automáticamente para cargar clases de la carpeta "services".
 *
 * @param string $classname El nombre de la clase que se está intentando cargar.
 */
function LoadServices($classname)
{
    // Llama a la función Load pasando el nombre de la clase y el tipo "services".
    Load($classname, "services");
}

/**
 * Función que carga el archivo PHP correspondiente a la clase desde la carpeta especificada.
 *
 * @param string $classname El nombre de la clase que se está intentando cargar.
 * @param string $type El tipo de clase, utilizado para construir la ruta (database, models, controllers, services).
 */
function Load($classname, $type)
{
    // Define la extensión del archivo PHP.
    $extension = ".php";

    // Construye la ruta completa al archivo de la clase.
    // Ejemplo de $path: '../models/NombreClase.php'
    $path = '../' . $type . '/' . $classname . $extension;

    try {
        // Verifica si el archivo existe en la ruta especificada.
        if (file_exists($path)) {
            // Incluye el archivo para cargar la clase.
            require_once $path;
        }
    } catch (Exception $e) {
        // En caso de error, muestra el mensaje de excepción y termina la ejecución del script.
        echo $e->getMessage();
        die();
    }
}
