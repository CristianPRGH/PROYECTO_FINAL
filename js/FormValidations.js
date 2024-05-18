function ShowError(campo, error, msg) {
    campo.style.border = "2px solid crimson";
    error.innerHTML = msg;
    error.style.visibility = "visible";
}

function ValidaCampos(campos, errores) {

    let formErrors = false;
    let formData = new FormData();

    for (let i = 0; i < campos.length; i++) {
        let campo = campos[i];
        let error = errores[i];

        error.innerHTML = "";

        if (campo.className == "required")  if (ValidaEmpty(campo, error))      { formErrors = true; continue; }
        if (campo.id.includes("dni"))       if (ValidarDNI(campo, error))       { formErrors = true; continue; }
        if (campo.id.includes("nombre") || campo.id.includes("apellidos")) if (ValidarNombre(campo, error)) { formErrors = true; continue; }
        if (campo.type == "email")          if (ValidaEmail(campo, error))      { formErrors = true; continue; }
        if (campo.type == "date")           if (ValidaFecha(campo, error))      { formErrors = true; continue; }
        if (campo.type == "tel")            if (ValidaTelefono(campo, error))   { formErrors = true; continue; }

        campo.style.border = "2px solid green";
        error.style.visibility = "hidden";
    }

    
    formData.append("formErrors", formErrors);
    return formData;
}



// VALIDACIONES //
function ValidaEmpty(campo, error) {
    campoValue = campo.value.trim();
    if (campoValue.length === 0) {
        let msg = "El campo no puede estar vacío.";
        ShowError(campo, error, msg);
        return true;
    }

    return false;
}

function ValidarNombre(campo, error)
{
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]+\s?[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'-]*$/;

    if (campo.value.length > 0 && !nameRegex.test(campo.value))
    {
        let msg = "El campo "+campo.id.split('-')[1]+" no tiene el formato correcto.";
        ShowError(campo, error, msg);
        return true;
    }
}

function ValidarDNI(dni, error) {
    let dniRegex = /^(\d{8}[A-HJ-NP-TV-Z]|[XYZ]\d{7}[A-Z])$/;
    let dniCompleto = dni.value.trim().toUpperCase();
    let letras = [
        "T","R","W","A","G","M","Y","F","P",
        "D","X","B","N","J","Z","S","Q","V",
        "H","L","C","K","E","T",
    ];

    if (!dniRegex.test(dniCompleto))
    {
        let msg = "El numero de documento proporcionado no es valido.";
        ShowError(dni, error, msg);
        return true;
    }

    let primerDigito = dniCompleto.slice(0, 1);

    if (!isNaN(parseInt(primerDigito))) {
        // => DNI
        dniNumero = dniCompleto.slice(0, 8);
        dniLetra = dniCompleto.slice(8, 9);

        resultado = dniNumero % 23;

        if (dniLetra != letras[resultado]) {
            let msg = "La letra del DNI introducido no es válida";
            ShowError(dni, error, msg);
            return true;
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
            ShowError(dni, error, msg);
            return true;
        }
    }

    return false;
}

function ValidaEmail(email, error) {
    let regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (email.value.length > 0 && !regexEmail.test(email.value)) {
        let msg = "El email no tiene el formato correcto.";
        ShowError(email, error, msg);
        return true;
    }

    return false;
}

const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
// const DATE_REGEX = /^\d{4}-\d{2}/;
// const CURRENT_YEAR = new Date().getFullYear();
const TODAY = new Date();
const CURRENT_YEAR  = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth();
const CURRENT_DAY   = TODAY.getDate();

function ValidaFecha(fecha, error) {

    if (fecha.value.length > 0)
    {
        let valoresFecha = fecha.value.split('-');
        let fechaFormateada = valoresFecha[2]+'/'+valoresFecha[1]+'/'+valoresFecha[0];

        /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
        if (!DATE_REGEX.test(fechaFormateada)) {
            let msg = "El formato de la fecha no es correcto.";
            ShowError(fecha, error, msg);
            return true;
        }

        /* Comprobar los días del mes */
        const day = parseInt(fechaFormateada.split("/")[0]);
        const month = parseInt(fechaFormateada.split("/")[1]);
        const year = parseInt(fechaFormateada.split("/")[2]);
        const monthDays = new Date(year, month, 0).getDate();

        if (day > monthDays) {
            let msg = "El día no puede ser mayor a los del mes.";
            ShowError(fecha, error, msg);
            return true;
        }

        /* Comprobar que el año no sea superior al actual*/
        if (year > CURRENT_YEAR) {
            let msg = "El año no puede ser mayor al actual.";
            ShowError(fecha, error, msg);
            return true;
        }

        // VALIDA MAYOR DE EDAD
        let miFecha = new Date(fecha.value);
        let diffYear = CURRENT_YEAR - miFecha.getFullYear();
        if (diffYear < 18)
        {
            let msg = "Debe ser mayor de edad.";
            ShowError(fecha, error, msg);
            return true;
        }
        else if (diffYear == 18)
        {
            let diffMes = CURRENT_MONTH - miFecha.getMonth();
            if (diffMes != 0)
            {
                let msg = "Debe ser mayor de edad.";
                ShowError(fecha, error, msg);
                return true;
            }
            else if (diffMes == 0)
            {
                let diffDias = CURRENT_DAY - miFecha.getDate();
                if (diffDias != 0)
                {
                    let msg = "Debe ser mayor de edad.";
                    ShowError(fecha, error, msg);
                    return true;
                }
            }
        }
    }

    return false;
}

function ValidaTelefono(tel, error)
{
    let telRegex = /^(\+\d{1,3}\s?)?(\d{3,4}[-\s]?){2}\d{3,4}$/;
    if (tel.value.length > 0 && !telRegex.test(tel.value))
    {
        let msg = "El formato del teléfono no es correcto.";
        ShowError(tel, error, msg);
        return true;
    }

    return false;
}