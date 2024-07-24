import * as tweens from "../components/tweenControls.js";
import {ValidateInputs, ValidateOnServer} from "./formValidations.js";

let tweenLogin, tweenRegister, tweenErrorIcon, tweenValidIcon;
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
    tweenErrorIcon = gsap.fromTo(".form-error-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
    tweenValidIcon = gsap.fromTo(".form-valid-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
}

function InitializeEvents()
{
    document.getElementById("to-signup").addEventListener('click', HandleSignupLink);
    document.getElementById("submit-register").addEventListener('click', HandleSignupSubmit);
    document.getElementById("submit-login").addEventListener('click', HandleLoginSubmit);
    document.getElementById('input-userimg').addEventListener('change', HandleSigninUserImg);

    document.getElementById("input-username").addEventListener("blur", HandleUsernameExists);
    document.getElementById("input-email").addEventListener("blur", HandleEmailExists);
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
    if (res == 0)
    {
        tweens.ReverseAnimation(tweenLogin);
        tweens.ReverseAnimation(tweenRegister);
        ResetRegisterForm();
    }
}

async function HandleLoginSubmit()
{
    const res = await ValidateLogin();
    if (res)
    {
        window.location.href = "../index.php";
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
    if (event.target.value.length > 0)
    {
        const inputs = [
            GenerateInputJson(event.target.id, "v_usernameexists")
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
            GenerateInputJson(event.target.id, "v_emailexists")
        ];

        ValidateInputs(inputs);
    }
}

async function ValidateLogin()
{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const formdata = new FormData();
    formdata.append("username",username);
    formdata.append("password",password);

    try {
        const response = await fetch("../backend/includes/user.checklogin.php",{
            method:"post",
            body: formdata
        })

        if (response.ok)
        {
            const result = await response.json();
            const errormsg = document.getElementById("error-login");
            if (!result[0])
            {
                errormsg.textContent = result[1];
                errormsg.classList.remove("invisible");
                errormsg.classList.add("visible");
            }
            else{
                errormsg.classList.remove("visible");
                errormsg.classList.add("invisible");
            }

            return result[0];
        }
    } catch (error) {
        console.error(error);
    }
}

async function ValidateRegister()
{
    let result = false;

    const inputs = [
        GenerateInputJson("input-username"),
        GenerateInputJson("input-email"),
        GenerateInputJson("input-password"),
        GenerateInputJson("input-userimg")
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
    formdata.append("username",inputs[0].value);
    formdata.append("email",inputs[1].value);
    formdata.append("password",inputs[2].value);

    const image = document.getElementById("input-userimg").files[0];
    formdata.append("image", image);

    try {
        const response = await fetch("../backend/includes/user.insertuser.php",{
            method: "post",
            body: formdata
        })
        if (response.ok)
        {
            const result = await response.json();
            return result.error;
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

function GenerateInputJson(id, inputclasses = "")
{
    const input = document.getElementById(id);
    const classes = inputclasses == "" ? Array.from(input.classList).join(' ') : inputclasses;

    
    return {
        "id":input.id,
        "classes":classes,
        "value": input.type != "file" ? input.value : input.files[0]
    }
}

function SetInputsToFormData(inputs, files)
{
    const imgfile = document.getElementById(files);
    const formdata = new FormData();
    formdata.append("imgfile", imgfile.files[0]);

    let jsonInputs = [];

    inputs.forEach(input => {
        if (input.type != "file") jsonInputs.push(input);
    });
    
    formdata.append("inputs", JSON.stringify(jsonInputs));
    return formdata;
}

// function SetValidMsg(id, msg)
// {
//     inputValidations[id] = msg;
//     return {
//         "inputs":inputValidations
//     }
// }