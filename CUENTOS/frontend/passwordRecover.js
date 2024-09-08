import { ValidateInputs, ValidateOnServer } from "./formValidations.js";
import { InputJson, SetInputsToFormData } from "../components/inputsManager.js";

document.addEventListener('DOMContentLoaded', ()=>{
    initializeEvents();
})

function initializeEvents()
{
    document.getElementById("submit-recover").addEventListener('click', ()=>{RecoverPassword()});
}

async function RecoverPassword()
{
    let result = false;
    const inputs = [
        InputJson("input-password")
    ];

    const isvalid = await ValidateInputs(inputs);    // Valida en cliente

    //Si la validacion en cliente es correcta -> Valida en servidor
    if (isvalid) {
        const formdata = SetInputsToFormData(inputs);
        result = await ValidateOnServer(formdata);
    }

    // Si la validacion en servidor es correcta -> Inserta usuario
    if (result) { result = ChangePassword(inputs); }

    return result;
}

async function ChangePassword()
{
    const token = GetUrlParams();
    const formData = new FormData();
    formData.append("action", "resetPassword");
    formData.append("password", document.getElementById("input-password").value);
    formData.append("token", token);
    const errormsg = document.getElementById("error-resetpwd");

    try {
        const response = await fetch("../backend/includes/UserHandler.php",{
            method:"post",
            body:formData
        })

        if (response.ok)
        {
            const res = await response.json();
            if (res.error == 0)
            {
                errormsg.classList.remove("invisible", "text-red-600");
                errormsg.classList.add("visible", "text-green-500");
                errormsg.textContent = res.msg;

                setTimeout(function () {
                    window.location.href = "auth.html";
                }, 5000);
            }
            else{
                ToggleErrorText(res.error, res.msg, errormsg);
            }
        }
    } catch (error) {
        console.log(error);
    }

}

function ToggleErrorText(error, msg, input) {
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

function GetUrlParams() {
    // Obtiene los parametros en la URL
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    return urlParams.get("token");
}