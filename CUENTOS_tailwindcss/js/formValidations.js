let formValid = [];
const validations = {
    required: ValidateEmpty,
    dni: ValidateDNI,
    name: ValidateName,
    email: ValidateEmail,
    date: ValidateDate,
    tel: ValidateTel,
    username: ValidateUsername,
    password: ValidatePassword,
    passwordRepeat: ValidatePasswordRepeat
};

function SetInputValidation(inputid, msg)
{
    formValid[inputid] = msg;
}

function ValidateInputs(inputs)
{
    let isValid = true;

    for (const input of inputs) {
        for (const [key, validation] of Object.entries(validations)) {
            if (input.classList.contains(key) || input.id.includes(key) || input.type == key)
            {
                if (!validation(input)) { isValid = false; break; }
                else { SetInputValidation(input.id, "valid"); }
            }
        }        
    }

    formValid["isValid"] = isValid;
    return formValid;
}



// VALIDACIONES //
function ValidateEmpty(input) {
    inputValue = input.value.trim();
    if (inputValue.length === 0) {
        const msg = "Campo vacío";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}

function ValidateName(input)
{
    // let nameRegex = (input.id.includes("publico")) ? /^[0-9a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+$/ : /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+(\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+)*$/;

    if (input.value.length > 0 && !regex.test(input.value))
    {
        const msg = "Formato incorrecto.";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}

function ValidateUsername(input)
{
    const regex = /^[a-z\d]+$/i;

    if (input.value.length > 0 && !regex.text(input.value))
    {
        const msg = "Formato incorrecto.";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}

function ValidateDNI(input) {
    let dniRegex = /^(\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-Z])$/;
    let dniCompleto = input.value.trim().toUpperCase();
    let letras = [
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

    let primerDigito = dniCompleto.slice(0, 1);

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
        var letrasIniciales = { 'X': 0, 'Y': 1, 'Z': 2 };
        var nieNumerico = dniCompleto.replace(/[XYZ]/, function(match) {
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

function ValidateEmail(input) {
    let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (input.value.length > 0 && !regexEmail.test(input.value)) {
        const msg = "Formato no válido";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}

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

    if (input.value.length > 0)
    {
        let valoresFecha = input.value.split('-');
        let fechaFormateada = valoresFecha[2]+'/'+valoresFecha[1]+'/'+valoresFecha[0];

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
        let miFecha = new Date(input.value);
        let diffYear = CURRENT_YEAR - miFecha.getFullYear();
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

    if (validDate) return validDate;
    else{
        SetInputValidation(input.id, msg);
        return validDate;
    }

    
}

function ValidateTel(input)
{
    let telRegex = /^(\+\d{1,3}\s?)?(\d{3,4}[-\s]?){2}\d{3,4}$/;
    if (input.value.length > 0 && !telRegex.test(input.value))
    {
        const msg = "Formato no válido";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}


function ValidatePassword(input)
{
    let valor = input.value;
    let msg = "";

    input.classList.remove(input.classList.item(input.classList.length -1));
    if (valor.length > 0)
    {
        let level = 0;
        level += (valor.length > 5 && valor.length < 13) ? 1 : 0;           // Longitud entre 6 y 12 caracteres
        level += /(?=(.*[!@#$%^&*(),.?":{}|<>]){2,})/.test(valor) ? 1 : 0;  // Contiene al menos 2 caracteres especiales
        level += /(?=(.*[a-z]){2,})/.test(valor) ? 1 : 0;                   // Contiene al menos 2 letras minúsculas
        level += /(?=(.*[A-Z]){2,})/.test(valor) ? 1 : 0;                   // Contiene al menos 2 letras mayúsculas
        level += /(?=(.*\d){2,})/.test(valor) ? 1 : 0;                      // Contiene al menos 2 números

        switch (level) {
            case 1:
                input.classList.add("veryweak");
                break;
            case 2:
                input.classList.add("weak");
                break;
            case 3:
                input.classList.add("moderate");
                break;
            case 4:
                input.classList.add("strong");
                break;
            case 5:
                input.classList.add("verystrong");
                break;
        }
    
        
        if (level < 5)
        {
            msg = "No cumple los requisitos";
            
            SetInputValidation(input.id, msg);
            return false;
        }
        else{
            input.classList.add("default");
        }
    }

    return true;
}

function ValidatePasswordRepeat(input)
{
    let pass2 = document.getElementById(input.dataset.repeat);

    if (input.value != pass2.value)
    {
        const msg = "Las contraseñas no coinciden";
        SetInputValidation(input.id, msg);
        return false;
    }

    return true;
}