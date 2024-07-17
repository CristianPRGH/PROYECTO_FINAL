import * as tweens from "../components/tweenControls.js";
import {ValidateInputs} from "./formValidations.js";

let tweenLogin;
let tweenRegister;
let tweenErrorIcon;
let tweenValidIcon;

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeTweens();
    InitializeEvents();
})


function InitializeEvents()
{
    document.getElementById("to-signup").addEventListener('click', ()=>{
        ResetRegisterForm();
        tweens.PlayAnimation(tweenLogin);
        tweens.PlayAnimation(tweenRegister);
    });

    document.getElementById("submit-login").addEventListener('click', ()=>{
        // if (Validatelogin())
        // {
            
        // }

        window.location.href = "../index.html";
    });
    
    document.getElementById("submit-register").addEventListener('click', ()=>{
        const res =  ValidateRegister();
        if (res === true)
        {
            tweens.ReverseAnimation(tweenLogin);
            tweens.ReverseAnimation(tweenRegister);
        }
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
    tweenLogin     = gsap.to("#login-form",    {duration: 1, yPercent: -100, opacity: 0, ease:"sine.inOut", paused:true});
    tweenRegister  = gsap.to("#register-form", {duration: 1, yPercent: -100, opacity: 1, ease:"sine.inOut", paused:true});
    tweenErrorIcon = gsap.fromTo(".form-error-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
    tweenValidIcon = gsap.fromTo(".form-valid-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
}

async function ValidateRegister()
{
    const inputs = [
        GeneraInputsJson(document.getElementById("input-username")),
        GeneraInputsJson(document.getElementById("input-email")),
        GeneraInputsJson(document.getElementById("input-password"))
    ];

    // Valida inputs en cliente
    const formValid = ValidateInputs(inputs);
    ShowInputErrors(formValid.inputs);

    if (formValid.isvalid)
    {
        // Valida inputs en servidor
        try {
            const res = await fetch("../backend/includes/signin-validations.php",{
                method:"post",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(inputs)
            })
            if (res.ok)
            {
                const result = await res.json();
                ShowInputErrors(result.datos);

                if (result.code == 0) { InsertUser(inputs); }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // console.log(formValid);
    return formValid.isvalid;
}

async function InsertUser(inputs)
{
    try {
        const res = await fetch("../backend/includes/user-insert.php",{
            method:"post",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(inputs)
        })
        if (res.ok)
        {
            const result = await res.json();
            console.log(result);
            // if (result == 0)
            // {
                
            // }
        }
    } catch (error) {
        console.error(error);
    }
}

function ShowInputErrors(formValid)
{
    // Recorre las validaciones del formulario
    for (const [input, msg] of Object.entries(formValid)) {
        if (input != "isValid") // Si el formulario no es válido:
        {
            const validInputId = document.getElementById(input).dataset.valid;  // Obtiene el id del contenedor de los iconos y mensaje de validación
            const validInput   = document.getElementById(validInputId);         // Obtiene el contenedor
            const errorMsg     = document.getElementById(validInput.dataset.errormsg);  // Obtiene el id del mensaje de error
            
            if (msg != "valid") // Si el mensaje de validación no es "valid":
            {
                tweens.PlayAnimation(tweenErrorIcon);   // Reproduce la animación de los iconos de error
                validInput.classList.remove("valid");   // Quita la clase "valid" del contenedor de validación 
                validInput.classList.add("notvalid");   // Añade la clase "notvalid" del contenedor de validación 
                errorMsg.innerHTML = msg;               // Añade el mensaje de la validación
            }
            else
            {
                tweens.PlayAnimation(tweenValidIcon);   // Reproduce la animación de los iconos de check
                validInput.classList.remove("notvalid");// Quita la clase "notvalid" del contenedor de validación 
                validInput.classList.add("valid");      // Añade la clase "valid" del contenedor de validación 
                errorMsg.innerHTML = "";                // No hay mensaje de validación
            }
        }
    }
}

function ResetRegisterForm()
{
    document.getElementById("input-username").value = "";
    document.getElementById("input-email").value = "";
    document.getElementById("input-password").value = "";
    document.getElementById("input-password-repeat").value = "";
    Array.from(document.getElementsByClassName("valid")).map(each=>each.classList.remove("valid"));
    Array.from(document.getElementsByClassName("notvalid")).map(each=>each.classList.remove("notvalid"));
}

function GeneraInputsJson(input)
{
    return {
        "id":input.id,
        "classes":Array.from(input.classList).join(' '),
        "type":input.type,
        "value":input.value
    }
}