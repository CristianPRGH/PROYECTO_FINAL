import * as tweens from "../components/tweenControls.js";

let loginForm;
let registerForm;
let tweenLogin;
let tweenRegister;
let tweenErrorIcon;
let tweenValidIcon;

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeVariables();
    InitializeTweens();
    InitializeEvents();
})

function InitializeVariables()
{
    loginForm    = document.getElementById("login-form");
    registerForm = document.getElementById("register-form");
}

function InitializeEvents()
{
    document.getElementById("to-signup").addEventListener('click', ()=>{
        ResetRegisterForm();
        tweens.PlayAnimation(tweenLogin);
        tweens.PlayAnimation(tweenRegister);
    });
    
    document.getElementById("submit-register").addEventListener('click', ()=>{
        if (ValidateRegister())
        {
            tweens.ReverseAnimation(tweenLogin);
            tweens.ReverseAnimation(tweenRegister);
        }
    });
    
    document.getElementById("submit-login").addEventListener('click', ()=>{
        // if (Validatelogin())
        // {
            
        // }

        window.location.href = "../index.html";
    });

    
    // Añade un evento de cambio al input de tipo file
    document.getElementById('input-file').addEventListener('change', function(event) {
        // Verifica si hay un archivo seleccionado
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader(); // Crea un nuevo FileReader

            // Define una función que se ejecutará cuando el archivo se haya leído
            reader.onload = function(e) {
                // Cambia la fuente de la imagen de perfil a la URL de los datos leídos del archivo
                document.getElementById('input-profilepic').src = e.target.result;
            }

            // Lee el archivo seleccionado como una URL de datos
            reader.readAsDataURL(event.target.files[0]);
        }
    });
}

function InitializeTweens()
{
    tweenLogin     = gsap.to(loginForm,    {duration: 1, yPercent: -100, opacity: 0, ease:"sine.inOut", paused:true});
    tweenRegister  = gsap.to(registerForm, {duration: 1, yPercent: -100, opacity: 1, ease:"sine.inOut", paused:true});
    tweenErrorIcon = gsap.fromTo(".form-error-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
    tweenValidIcon = gsap.fromTo(".form-valid-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
}

function ValidateRegister()
{
    const inputs = [
        document.getElementById("input-name"),
        document.getElementById("input-email"),
        document.getElementById("input-password")
    ];

    const formValid = ValidateInputs(inputs);
    if (!formValid.isValid) ShowInputErrors(formValid);
    return formValid.isValid;
}

function ShowInputErrors(formValid)
{
    for (const [input, msg] of Object.entries(formValid)) {
        if (input != "isValid")
        {
            const validInputId = document.getElementById(input).dataset.valid;
            const validInput   = document.getElementById(validInputId);
            const errorMsg     = document.getElementById(validInput.dataset.errormsg);
            
            if (msg != "valid")
            {
                tweens.PlayAnimation(tweenErrorIcon);
                validInput.classList.remove("valid");
                validInput.classList.add("notvalid");
                errorMsg.innerHTML = msg;
            }
            else
            {
                tweens.PlayAnimation(tweenValidIcon);
                validInput.classList.remove("notvalid");
                validInput.classList.add("valid");
                errorMsg.innerHTML = "";
            }
        }
    }
}

function ResetRegisterForm()
{
    document.getElementById("input-name").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-password").value = "";
    document.getElementById("input-password-repeat").value = "";
    Array.from(document.getElementsByClassName("valid")).map(each=>each.classList.remove("valid"));
    Array.from(document.getElementsByClassName("notvalid")).map(each=>each.classList.remove("notvalid"));
}