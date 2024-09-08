<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
    <link rel="stylesheet" href="../styles/output.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="../frontend/passwordRecover.js" type="module"></script>

    <title>Document</title>
</head>

<body class="h-screen bg-[url('../images/backgrounds/bg_books.png')]  bg-no-repeat bg-cover md:bg-contain duration-200">
    <section class="w-full h-full overflow-y-hidden duration-200">
        <article id="reset-password-form" class="flex justify-center items-center h-full w-full">
            <div class="flex flex-col md:w-1/2 lg:w-1/3 xl:w-1/4 h-fit backdrop-blur-sm p-10 rounded-lg shadow-md">
                <p class="w-full text-2xl text-center">Recupera tu contraseña</p>

                <div class="relative w-full">
                    <input type="password" id="input-password" placeholder="Nueva contraseña" class="form-input placeholder:text-xs v_required v_pwdformat v_repeatpwd " data-valid="valid-password" data-repeat="input-password-repeat">
                    <i class="material-symbols-rounded form-icon">lock</i>
                    <div id="valid-password" data-errormsg="error-password">
                        <i class="material-symbols-rounded form-error-icon">error</i>
                        <p id="error-password" class="form-error-message"></p>
                        <i class="material-symbols-rounded form-valid-icon">check_circle</i>
                    </div>
                </div>

                <div class="relative w-full">
                    <input type="password" id="input-password-repeat" placeholder="Repite nueva contraseña" class="form-input placeholder:text-xs v_required" data-valid="valid-password-repeat">
                    <i class="material-symbols-rounded form-icon">lock_reset</i>
                    <div id="valid-password-repeat" data-errormsg="error-password-repeat">
                        <i class="material-symbols-rounded form-error-icon">error</i>
                        <p id="error-password-repeat" class="form-error-message"></p>
                        <i class="material-symbols-rounded form-valid-icon">check_circle</i>
                    </div>
                </div>

                <div class="w-full flex justify-center">
                    <button type="button" id="submit-recover" class="py-1 my-5 rounded-md shadow-md text-[#333] bg-[#A8E6CF] w-1/2">Recuperar</button>
                </div>

                <p id="error-resetpwd" class="animate-pulse text-center text-sm text-red-600 w-full invisible"></p>
            </div>
        </article>
    </section>
</body>

</html>