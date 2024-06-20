<?php
session_start();
if (!$_SESSION["user"]) header("Location: Login.html");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="../css/styles_main.css">
    <link rel="stylesheet" href="../css/styles_forms.css">
    <link rel="stylesheet" href="../css/styles_tables.css">
    <link rel="stylesheet" href="../css/styles_modals.css">
    <link rel="stylesheet" href="../css/styles_filters.css">
    
</head>

<body>

    <section class="main-container">
        <div id="load-header"></div>

        <aside class="body-leftmenu">
            <ul class="modulos">
                <li class="modulo-titulo">GESTIÓN DE USUARIOS</li>
                <li class="modulo-opcion pointer" onclick="LoadContent('Users.html','load-content')">Usuarios</li>
                <li class="modulo-opcion pointer" onclick="LoadContent('Roles.html','load-content')">Roles</li>
            </ul>
        </aside>
        
        <!-- SE CARGA EL CONTENIDO MEDIANTE AJAX -->
        <div id="load-content">
            <h1>PÁGINA PRINCIPAL</h1>
        </div>

        <aside class="body-rightmenu"></aside>

    </section>
</body>

<script src="../js/AJAXLoadContent.js"></script>
<script src="../js/FormValidations.js"></script>
<script src="../js/CreateDataTable.js"></script>
<script src="../js/ModalManager.js"></script>


<script>
    document.addEventListener("DOMContentLoaded", () => {
        LoadContent('Header.php','load-header');
    })
</script>

</html>