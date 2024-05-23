<?php
// session_start();

if (isset($_POST["bttn-logout"]))
{
    if (strlen($_SESSION["user"]) != 0)
    {
        session_destroy();
        header("Location: Login.html");
    }
}

?>

<header class="flexRow">
    <img src="../images/logo_erp.png" alt="">
    <article class="user-box flexRow">
        <p><?= $_SESSION["user"]; ?></p>
        <form method="post" action="Header.php">
            <button type="submit" name="bttn-logout" class="formBttn pointer">Log-Out</button>
        </form>
    </article>
</header>
