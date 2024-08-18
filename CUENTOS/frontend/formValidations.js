import * as tweens from "../components/tweenControls.js";
const validations = {
    v_required: ValidateEmpty,
    v_name:ValidateName,
    v_emailexists: ValidateEmailExists,
    v_emailformat: ValidateEmail,
    v_usernameexists: ValidateUsernameExists,
    v_username: ValidateUsername,
    v_pwdformat: ValidatePassword,
    v_repeatpwd: ValidatePasswordRepeat,
    v_imgsize: ValidateImageSize
};
let inputvalidations = [];
let tweenErrorIcon, tweenValidIcon;
InitializeTweens();

function InitializeTweens()
{
    tweenErrorIcon = gsap.fromTo(".form-error-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
    tweenValidIcon = gsap.fromTo(".form-valid-icon", {y:-5}, {duration: 0.5, y:0, ease:"bounce", paused:true});
}


// Añade el input id y el mensaje de validación a un array
function SetInputValidation(inputid, msg)
{
    inputvalidations[inputid] = msg;
}

// Recibe los inputs de la vista
export async function ValidateInputs(inputs)
{
    let isValid = true;
    
    for (const input of inputs) {
        for (const [key, validation] of Object.entries(validations)) {
            if (input.validations.includes(key))
            {
                const res = await validation(input);
                if (!res)
                {
                    isValid = false;
                    break;
                }else{
                    SetInputValidation(input.id, "valid");
                }
            }
        }        
    }

    ShowInputErrors(inputvalidations);
    return isValid;
}

export async function ValidateOnServer(inputs)
{
    let formValid = false;
    try {
        const response = await fetch("../backend/services/serverValidations.php", {
            method: "post",
            body:inputs
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(inputs)
        });
        if (response.ok) {
            const result = await response.json();
            formValid = result.error == 0 ? true : false;
            ShowInputErrors(result.inputs);
        }
    } catch (error) {
        console.error(error);
    }

    return formValid;
}

function ShowInputErrors(formValidations)
{
    // Recorre las validaciones del formulario
    for (const [inputid, msg] of Object.entries(formValidations)) {
        const validInputId = document.getElementById(inputid).dataset.valid;        // Obtiene el id del contenedor de los iconos y mensaje de validación
        const validInput   = document.getElementById(validInputId);                 // Obtiene el contenedor
        const errorMsg     = document.getElementById(validInput.dataset.errormsg);  // Obtiene el id del mensaje de error
        
        if (msg != "")
        {
            if (msg != "valid") // Si el mensaje de validación no es "valid":
            {
                tweens.PlayAnimation(tweenErrorIcon);   // Reproduce la animación de los iconos de error
                validInput.classList.remove("valid");   // Quita la clase "valid" del contenedor de validación 
                validInput.classList.add("notvalid");   // Añade la clase "notvalid" al contenedor de validación 
                errorMsg.innerHTML = msg;               // Añade el mensaje de la validación
            }
            else
            {
                tweens.PlayAnimation(tweenValidIcon);   // Reproduce la animación de los iconos de check
                validInput.classList.remove("notvalid");// Quita la clase "notvalid" del contenedor de validación 
                validInput.classList.add("valid");      // Añade la clase "valid" al contenedor de validación 
                errorMsg.innerHTML = "";                // No hay mensaje de validación
            }
        }else{
            validInput.classList.remove("valid", "notvalid");   // Quita la clase "valid" del contenedor de validación 
            errorMsg.innerHTML = "";                // No hay mensaje de validación
        }
    }
}

/* ------------------------------------------------------------------------------------------------------------ */

function CleanData(value)
{
    return DOMPurify.sanitize(value, {USE_PROFILES: {html: true}});
}

// VALIDACIONES // Retornan TRUE si es válido o FALSE si no lo es


// REQUIRED -------------------------------------------------------------------------

function ValidateEmpty(input) {
    
    const value = CleanData(input.value);
    if (value.length === 0) {
        const msg = "Este campo es obligatorio";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}

function ValidateName(input)
{
    // let nameRegex = (input.id.includes("publico")) ? /^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+$/ : /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/;
    const value = CleanData(input.value).trim();

    if (value.length > 0 && !regex.test(value))
    {
        const msg = "Formato incorrecto.";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}




// USERNAME -------------------------------------------------------------------------

async function ValidateUsernameExists(input)
{
    const value = CleanData(input.value).trim().toLowerCase();;
    if (value.length > 0)
    {
        const formdata = new FormData();
        formdata.append('value', value);

        try {
            const response = await fetch('../backend/includes/user.checkusername.php', {
                method: "post",
                body: formdata
            });
            if (response.ok) 
            {
                const result = await response.json();

                if (result.data != false)
                {
                    SetInputValidation(input.id, result.msg);
                    return false;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return true;
}

function ValidateUsername(input)
{
    const regex = /^[a-z\d]+$/i;
    const value = CleanData(input.value).trim();

    if (value.length > 0 && !regex.test(value))
    {
        const msg = "Formato incorrecto";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}





// DNI -------------------------------------------------------------------------

function ValidateDNI(input) {
    const dniRegex = /^(\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-Z])$/;
    // let dniCompleto = input.value.trim().toUpperCase();
    const dniCompleto = CleanData(input.value).trim().toUpperCase();
    const letras = [
        "T","R","W","A","G","M","Y","F","P",
        "D","X","B","N","J","Z","S","Q","V",
        "H","L","C","K","E","T",
    ];

    let msg = "";

    if (!dniRegex.test(dniCompleto))
    {
        msg = "Número incorrecto.";
        SetInputValidation(input.id, msg);
        return false;
    }

    const primerDigito = dniCompleto.slice(0, 1);

    if (!isNaN(parseInt(primerDigito))) {
        // => DNI
        dniNumero = dniCompleto.slice(0, 8);
        dniLetra = dniCompleto.slice(8, 9);

        resultado = dniNumero % 23;

        if (dniLetra != letras[resultado]) {
            msg = "Letra no válida";
            SetInputValidation(input.id, msg);
            return false;
        }
    } // => NIE
    else {
        // Reemplazar la letra inicial por el número correspondiente
        const letrasIniciales = { 'X': 0, 'Y': 1, 'Z': 2 };
        const nieNumerico = dniCompleto.replace(/[XYZ]/, function(match) {
            return letrasIniciales[match];
        });

        dniNumero = nieNumerico.slice(0, 8);
        dniLetra = nieNumerico.slice(8, 9);

        resultado = dniNumero % 23;

        if (dniLetra != letras[resultado]) {
            msg = "Letra no válida";
            SetInputValidation(input.id, msg);
            return false;
        }
    }

    return true;
}





// EMAIL -------------------------------------------------------------------------

async function ValidateEmailExists(input)
{
    const value = CleanData(input.value).trim();
    if (value.length > 0)
    {
        const formdata = new FormData();
        formdata.append('value', value);

        try {
            const response = await fetch('../backend/includes/user.checkemail.php', {
                method: "post",
                body: formdata
            });
            if (response.ok) 
            {
                const result = await response.json();
                if (result.error == 0)
                {
                    SetInputValidation(input.id, result.msg);
                    return false;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return true;
}

function ValidateEmail(input) {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const value = CleanData(input.value).trim().toLowerCase();

    if (value.length > 0 && !regexEmail.test(value)) {
        const msg = "Formato no válido";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}



// DATES -------------------------------------------------------------------------

const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
// const DATE_REGEX = /^\d{4}-\d{2}/;
// const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date();
const CURRENT_YEAR  = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth();
const CURRENT_DAY   = TODAY.getDate();

function ValidateDate(input) {

    let validDate = true;
    let msg = "";
    const value = CleanData(input.value).trim();

    if (value.length > 0)
    {
        const valoresFecha = value.split('-');
        const fechaFormateada = valoresFecha[2]+'/'+valoresFecha[1]+'/'+valoresFecha[0];

        /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
        if (!DATE_REGEX.test(fechaFormateada)) {
            msg = "Formato no válido";
            validDate = false;
        }

        /* Comprobar los días del mes */
        const day = parseInt(fechaFormateada.split("/")[0]);
        const month = parseInt(fechaFormateada.split("/")[1]);
        const year = parseInt(fechaFormateada.split("/")[2]);
        const monthDays = new Date(year, month, 0).getDate();

        if (day > monthDays) {
            msg = "Día no válido";
            validDate = false;
        }

        /* Comprobar que el año no sea superior al actual*/
        if (year > CURRENT_YEAR) {
            msg = "Año mayor al actual";
            validDate = false;
        }

        // VALIDA MAYOR DE EDAD
        const miFecha = new Date(input.value);
        const diffYear = CURRENT_YEAR - miFecha.getFullYear();
        if (diffYear < 18)
        {
            msg = "Debe ser mayor de edad";
            validDate = false;
        }
        else if (diffYear == 18)
        {
            let diffMes = CURRENT_MONTH - miFecha.getMonth();
            if (diffMes != 0)
            {
                msg = "Debe ser mayor de edad";
                validDate = false;
            }
            else if (diffMes == 0)
            {
                let diffDias = CURRENT_DAY - miFecha.getDate();
                if (diffDias != 0)
                {
                    msg = "Debe ser mayor de edad";
                    validDate = false;
                }
            }
        }
    }

    if (validDate)
        return validDate;
    else{
        SetInputValidation(input.id, msg);
        return validDate;
    }
}



// PHONE -------------------------------------------------------------------------

function ValidateTel(input)
{
    const telRegex = /^(\+\d{1,3}\s?)?(\d{3,4}[-\s]?){2}\d{3,4}$/;
    const value = CleanData(input.value).trim();

    if (value.length > 0 && !telRegex.test(value))
    {
        const msg = "Formato no válido";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}





// PASSWORD -------------------------------------------------------------------------

function ValidatePassword(input)
{
    const value = CleanData(input.value).trim();
    let msg = "";
    
    // input.classList.remove(input.classList.item(input.classList.length -1));
    if (value.length > 0)
    {
        let level = 0;
        level += (value.length > 5 && value.length < 13) ? 1 : 0;           // Longitud entre 6 y 12 caracteres
        level += /(?=(.*[!@#$%^&*(),.?":{}|<>]){2,})/.test(value) ? 1 : 0;  // Contiene al menos 2 caracteres especiales
        level += /(?=(.*[a-z]){2,})/.test(value) ? 1 : 0;                   // Contiene al menos 2 letras minúsculas
        level += /(?=(.*[A-Z]){2,})/.test(value) ? 1 : 0;                   // Contiene al menos 2 letras mayúsculas
        level += /(?=(.*\d){2,})/.test(value) ? 1 : 0;                      // Contiene al menos 2 números

        // switch (level) {
        //     case 1:
        //         input.classList.add("veryweak");
        //         break;
        //     case 2:
        //         input.classList.add("weak");
        //         break;
        //     case 3:
        //         input.classList.add("moderate");
        //         break;
        //     case 4:
        //         input.classList.add("strong");
        //         break;
        //     case 5:
        //         input.classList.add("verystrong");
        //         break;
        // }
    
        
        if (level < 5)
        {
            msg = "De 6 a 12 caracteres / 2 símbolos / 2 Mayúsculas / 2 Minúsculas / 2 Números";
            SetInputValidation(input.id, msg);
            return false;
        }
        // else{
        //     input.classList.add("default");
        // }
    }

    return true;
}

function ValidatePasswordRepeat(input)
{
    const pass1 = CleanData(input.value).trim();
    const inputpassword = document.getElementById(input.id);
    let pass2 = document.getElementById(inputpassword.dataset.repeat).value;
    pass2 = CleanData(pass2).trim();

    if (pass1 != pass2)
    {
        const msg = "Las contraseñas no coinciden";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}


// IMAGES ---------------------------------------------------------------

function ValidateImageSize(input)
{
    const maxsize = 100;

    if (input.value != null)
    {
        const filesize = input.value.size;
        const sizeMb = Math.round((filesize/1024));

        if (sizeMb > maxsize)
        {
            const msg = "La imagen debe ser menor a 1Mb";
            SetInputValidation(input.id, msg);
            return false;
        }
    }

    return true;
}