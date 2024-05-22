<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="../css/styles_main.css">
    <link rel="stylesheet" href="../css/styles_forms.css">
    <link rel="stylesheet" href="../css/styles_tables.css">
    <link rel="stylesheet" href="../css/styles_modals.css">
    <link rel="stylesheet" href="../css/styles_filters.css">
    <title>Document</title>
</head>

<body>

    <section class="main-container">
        <?php include_once "Header.php" ?>

        <aside class="body-leftmenu">
            <ul>
                <li class="pointer">Usuarios</li>
                <li class="pointer">Roles</li>
            </ul>
        </aside>

        <?php //include "Users.html" ?>
        <?php include "Roles.html" ?>

    </section>
</body>

<script src="../js/FormValidations.js"></script>
<script src="../js/ModalManager.js"></script>
<script src="../js/ResetForm.js"></script>

</html>