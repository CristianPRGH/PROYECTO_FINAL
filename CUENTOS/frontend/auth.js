import * as tweens from "../components/tweenControls.js";
import {ValidateInputs, ValidateOnServer} from "./formValidations.js";
import {InputJson, SetInputsToFormData} from "../components/inputsManager.js";

let tweenLogin, tweenRegister, tweenRstPwd, tweenErrorIcon, tweenValidIcon;
const validationErrors = {
    "formValid":false,
    "validations":{}
};

document.addEventListener("DOMContentLoaded", ()=>{
    InitializeTweens();
    InitializeEvents();
})

function InitializeTweens()
{
    tweenLogin     = gsap.to("#login-form",    {duration: 1, yPercent: -100, opacity: 0, ease:"sine.inOut", paused:true});
    tweenRegister  = gsap.to("#register-form", {duration: 1, yPercent: -100, opacity: 1, ease:"sine.inOut", paused:true});
    tweenRstPwd    = gsap.to("#reset-password-form", {duration: 0.8, yPercent: -200, opacity: 1, ease:"sine.inOut", paused:true});
    tweenErrorIcon = gsap.fromTo(".form-error-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
    tweenValidIcon = gsap.fromTo(".form-valid-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
}

function InitializeEvents()
{
    document.getElementById("to-signup").addEventListener('click', HandleSignupLink);
    document.getElementById("to-rstpwd").addEventListener('click', HandleResetPasswordLink);
    document.getElementById("submit-register").addEventListener('click', () => {HandleSignupSubmit()});
    document.getElementById("submit-login").addEventListener('click', ()=>{HandleLoginSubmit()});
    document.getElementById("submit-rstpasw").addEventListener('click', ()=>{HandleResetPasswordSubmit()});
    document.getElementById('input-userimg').addEventListener('change', HandleSigninUserImg);

    document.getElementById("input-username").addEventListener("blur", HandleUsernameExists);
    document.getElementById("input-email").addEventListener("blur", HandleEmailExists);
}



function HandleResetPasswordLink()
{
    tweens.PlayAnimation(tweenLogin);
    tweens.PlayAnimation(tweenRstPwd);
}

function HandleSignupLink()
{
    // ResetRegisterForm();
    tweens.PlayAnimation(tweenLogin);
    tweens.PlayAnimation(tweenRegister);
}

async function HandleSignupSubmit()
{
    const res = await ValidateRegister();
    if (res.error == 0)
    {
        tweens.ReverseAnimation(tweenLogin);
        tweens.ReverseAnimation(tweenRegister);
        ResetRegisterForm();
    }else{
       
    }
}

async function HandleLoginSubmit()
{
    const res = await ValidateLogin();
    if (res == 0)
    {
        window.location.href = "../index.php";
    }
}

async function HandleResetPasswordSubmit()
{
    const value = document.getElementById("rstpwd-value").value;
    const errormsg = document.getElementById("error-resetpwd");

    const formdata = new FormData();
    formdata.append("action", "getUserEmail");
    formdata.append("value", value);

    if (value == "")
    {
        ToggleErrorText(1, "Debe introducir un email o nombre de usuario", errormsg);
    }
    else{
        try {
            const response = await fetch("../backend/includes/UserHandler.php",{
                method:"post",
                body:formdata
            })
            if (response.ok)
            {
                const res = await response.json();

                // ToggleErrorText(res.error, res.msg, errormsg);
                if (res.error == 0)
                {
                    errormsg.classList.remove("invisible", "text-red-600");
                    errormsg.classList.add("visible", "text-green-500");
                    errormsg.textContent = res.msg;

                    //code before the pause
                    setTimeout(function () {
                        window.location.href = "auth.html";
                    }, 5000);

                    // window.location.href = "../view/auth.html";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function HandleSigninUserImg(event)
{
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
}

function HandleUsernameExists(event)
{
    const value = event.target.value;
    if (value.length > 0)
    {
        const inputs = [
            InputJson(event.target.id, "v_usernameexists")
        ];

        ValidateInputs(inputs);
    }
}

function HandleEmailExists(event)
{
    const value = event.target.value;
    if (value.length > 0)
    {
        const inputs = [
            InputJson(event.target.id, "v_emailexists")
        ];

        ValidateInputs(inputs);
    }
}

async function ValidateLogin()
{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errormsg = document.getElementById("error-login");



    const formdata = new FormData();
    formdata.append("action","checkLogin");
    formdata.append("username",username);
    formdata.append("password",password);

    if (username == "" || password == "")
    {
        console.log("hola")
        ToggleErrorText(1, "Debe introducir el nombre de usuario y la contraseña.", errormsg);
    }
    else{
        try {
            const response = await fetch("../backend/includes/UserHandler.php",{
                method:"post",
                body: formdata
            })
            if (response.ok)
            {
                const res = await response.json();
                console.log(res);
                
                ToggleErrorText(res.error, res.msg, errormsg);
    
                // if (!res[0])
                // {
                //     errormsg.textContent = result[1];
                //     errormsg.classList.remove("invisible");
                //     errormsg.classList.add("visible");
                // }
                // else{
                //     errormsg.classList.remove("visible");
                //     errormsg.classList.add("invisible");
                // }
    
                return res.error;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

async function ValidateRegister()
{
    let result = false;

    const inputs = [
        InputJson("input-username"),
        InputJson("input-email"),
        InputJson("input-password"),
        InputJson("input-userimg")
    ];

    const isvalid = await ValidateInputs(inputs);    // Valida en cliente

    //Si la validacion en cliente es correcta -> Valida en servidor
    if (isvalid)
    {
        const formdata = SetInputsToFormData(inputs, "input-userimg");
        result = await ValidateOnServer(formdata);
    }
    

    // Si la validacion en servidor es correcta -> Inserta usuario
    if (result) { result = InsertUser(inputs); } 

    return result;
}

async function InsertUser(inputs)
{
    const formdata = new FormData();
    formdata.append("action","insertUser");
    formdata.append("username",inputs[0].value);
    formdata.append("email",inputs[1].value);
    formdata.append("password",inputs[2].value);

    const image = document.getElementById("input-userimg").files[0];
    formdata.append("image", image);

    try {
        const response = await fetch("../backend/includes/UserHandler.php",{
            method: "post",
            body: formdata
        })
        if (response.ok)
        {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }

    return false;
}

function ResetRegisterForm()
{
    ["input-username", "input-email", "input-password", "input-password-repeat"].forEach(id => {
        document.getElementById(id).value = "";
    });

    document.querySelectorAll(".valid, .notvalid").forEach(element => {
        element.classList.remove("valid", "notvalid");
    });

    document.getElementById("input-profilepic").src = "../images/users_avatars/user-default.png";
}

function ToggleErrorText(error, msg, input)
{
    if (error != 0) {
        input.textContent = msg;
        input.classList.remove("invisible");
        input.classList.add("visible");
    }
    else {
        input.classList.remove("visible");
        input.classList.add("invisible");
    }
}