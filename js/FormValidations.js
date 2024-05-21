function ShowError(campo, error, msg) {
    campo.style.border = "2px solid crimson";
    error.innerHTML = msg;
    error.style.visibility = "visible";
}

function ValidaCampos(campos, errores) {

    let formValid = true;
    let formData = new FormData();

    for (let i = 0; i < campos.length; i++) {
        let campo = campos[i];
        let error = errores[i];

        error.innerHTML = "";

        if (campo.className == "required")  if (!ValidaEmpty(campo, error))      { formValid = false; continue; }
        if (campo.id.includes("dni"))       if (!ValidarDNI(campo, error))       { formValid = false; continue; }
        if (campo.id.includes("nombre") || campo.id.includes("apellidos")) if (!ValidarNombre(campo, error)) { formValid = false; continue; }
        if (campo.type == "email")          if (!ValidaEmail(campo, error))      { formValid = false; continue; }
        if (campo.type == "date")           if (!ValidaFecha(campo, error))      { formValid = false; continue; }
        if (campo.type == "tel")            if (!ValidaTelefono(campo, error))   { formValid = false; continue; }
        if (campo.type == "password")       if (!ValidaPassword(campo, error))   { formValid = false; continue; }

        campo.style.border = "2px solid lightgreen";
        error.style.visibility = "hidden";
    }

    
    formData.append("formValid", formValid);
    return formData;
}



// VALIDACIONES //
function ValidaEmpty(campo, error) {
    campoValue = campo.value.trim();
    if (campoValue.length === 0) {
        let msg = "El campo no puede estar vacío.";
        ShowError(campo, error, msg);
        return false;
    }

    return true;
}

function ValidarNombre(campo, error)
{
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+\s?[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]*$/;

    if (campo.value.length > 0 && !nameRegex.test(campo.value))
    {
        let msg = "El campo "+campo.id.split('-')[1]+" no tiene el formato correcto.";
        ShowError(campo, error, msg);
        return false;
    }

    return true;
}

function ValidarDNI(campo, error) {
    let dniRegex = /^(\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-Z])$/;
    let dniCompleto = campo.value.trim().toUpperCase();
    let letras = [
        "T","R","W","A","G","M","Y","F","P",
        "D","X","B","N","J","Z","S","Q","V",
        "H","L","C","K","E","T",
    ];

    if (!dniRegex.test(dniCompleto))
    {
        let msg = "El numero de documento proporcionado no es valido.";
        ShowError(campo, error, msg);
        return false;
    }

    let primerDigito = dniCompleto.slice(0, 1);

    if (!isNaN(parseInt(primerDigito))) {
        // => DNI
        dniNumero = dniCompleto.slice(0, 8);
        dniLetra = dniCompleto.slice(8, 9);

        resultado = dniNumero % 23;

        if (dniLetra != letras[resultado]) {
            let msg = "La letra del DNI introducido no es válida";
            ShowError(campo, error, msg);
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
            let msg = "La letra del NIE introducido no es válida";
            ShowError(campo, error, msg);
            return false;
        }
    }

    return true;
}

function ValidaEmail(campo, error) {
    let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (campo.value.length > 0 && !regexEmail.test(campo.value)) {
        let msg = "El email no tiene el formato correcto.";
        ShowError(campo, error, msg);
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

function ValidaFecha(campo, error) {

    let validDate = true;
    let msg = "";

    if (campo.value.length > 0)
    {
        let valoresFecha = campo.value.split('-');
        let fechaFormateada = valoresFecha[2]+'/'+valoresFecha[1]+'/'+valoresFecha[0];

        /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
        if (!DATE_REGEX.test(fechaFormateada)) {
            msg = "El formato de la fecha no es correcto.";
            validDate = false;
        }

        /* Comprobar los días del mes */
        const day = parseInt(fechaFormateada.split("/")[0]);
        const month = parseInt(fechaFormateada.split("/")[1]);
        const year = parseInt(fechaFormateada.split("/")[2]);
        const monthDays = new Date(year, month, 0).getDate();

        if (day > monthDays) {
            msg = "El día no puede ser mayor a los del mes.";
            validDate = false;
        }

        /* Comprobar que el año no sea superior al actual*/
        if (year > CURRENT_YEAR) {
            msg = "El año no puede ser mayor al actual.";
            validDate = false;
        }

        // VALIDA MAYOR DE EDAD
        let miFecha = new Date(campo.value);
        let diffYear = CURRENT_YEAR - miFecha.getFullYear();
        if (diffYear < 18)
        {
            msg = "Debe ser mayor de edad.";
            validDate = false;
        }
        else if (diffYear == 18)
        {
            let diffMes = CURRENT_MONTH - miFecha.getMonth();
            if (diffMes != 0)
            {
                msg = "Debe ser mayor de edad.";
                validDate = false;
            }
            else if (diffMes == 0)
            {
                let diffDias = CURRENT_DAY - miFecha.getDate();
                if (diffDias != 0)
                {
                    msg = "Debe ser mayor de edad.";
                    validDate = false;
                }
            }
        }
    }

    if (validDate) return validDate;
    else{
        ShowError(campo, error, msg);
        return validDate;
    }

    
}

function ValidaTelefono(campo, error)
{
    let telRegex = /^(\+\d{1,3}\s?)?(\d{3,4}[-\s]?){2}\d{3,4}$/;
    if (campo.value.length > 0 && !telRegex.test(campo.value))
    {
        let msg = "El formato del teléfono no es correcto.";
        ShowError(campo, error, msg);
        return false;
    }

    return true;
}


function ValidaPassword(campo, error)
{
    let valor = campo.value;
    let msg = "";

    if (valor.length > 0)
        {

        var level = 0;
        level += (valor.length >= 6 && valor.length <= 12) ? 1 : 0;   // Longitud entre 6 y 12 caracteres
        level += /[!@#$%^&*?_~]{2,}/.test(valor) ? 1 : 0;              // Contiene al menos 1 caracteres especiales
        level += /[a-z]{2,}/.test(valor) ? 1 : 0;                      // Contiene al menos 1 letras minúsculas
        level += /[A-Z]{2,}/.test(valor) ? 1 : 0;                      // Contiene al menos 1 letras mayúsculas
        level += /[0-9]{2,}/.test(valor) ? 1 : 0;                      // Contiene al menos 1 números

        // let strongLevel = document.getElementById("strongLevel");
        switch (level) {
            case 1:
                securityColor = "#FF000054";
                break;
            case 2:
                securityColor = "#FFA50054";
                break;
            case 3:
                securityColor = "#FFFF0054";
                break;
            case 4:
                securityColor = "#ADFF2F54";
                break;
            case 5:
                securityColor = "#00800054";
                break;
            default:
                securityColor = null;
                break;
        }

        // campo.style.boxShadow = "inset 2px 2px 5px "+securityColor;
        campo.style.backgroundColor = securityColor;

        if (level < 5)
        {
            msg += "Requisitos de la contraseña:<br>";
            msg += "- Longitud entre 6 y 12<br>";
            msg += "- Mínimo una letra minúscula<br>";
            msg += "- Mínimo una letra mayúscula<br>";
            msg += "- Mínimo un numero<br>";
            msg += "- Mínimo un caracter especial";

            ShowError(campo, error, msg);
            return false;
        }
    }

    return true;


    //return level;
}