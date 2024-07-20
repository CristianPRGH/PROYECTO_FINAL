<?php
spl_autoload_register("LoadDatabase");
spl_autoload_register("LoadModels");
spl_autoload_register("LoadControllers");
spl_autoload_register("LoadServices");

function LoadDatabase($classname)
{
    Load($classname, "database");
}

function LoadModels($classname)
{
    Load($classname, "models");
}

function LoadControllers($classname)
{
    Load($classname, "controllers");
}

function LoadServices($classname)
{
    Load($classname, "services");
}

function Load($classname, $type)
{
    $extension = ".php";
    // $baseDir = __DIR__;
    $path = '../' . $type . '/' . $classname . $extension;
    
    try {
        if (file_exists($path))
        {
            require_once $path;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
        die();
    }
}