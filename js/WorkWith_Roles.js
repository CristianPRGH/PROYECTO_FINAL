
let allData = null;
let urlAlter = "../php_logic/AddRole.php";
let urlGet   = "../php_logic/GetRoles.php";


const GetRoles = async (url) => {
    // console.log("hola");
    try {
        const res = await fetch(url);
        if (!res.ok) throw {ok:false, msg:"Error al retornar los roles"};
        allData = await res.json();
        console.log(allData);
        CreateRolesTable(allData);
    } catch (error) {
        console.error(error);
    }
}

// AGREGA / MODIFICA / ELIMINA UNA ENTRADA EN LA TABLA DE EMPLEADOS
const AlterRolesTable = async(formData) => {
    try {
        const res = await fetch(urlAlter, {
            method:"POST",
            body:formData
        });
        if(!res.ok) throw {ok:false, msg: "No hay datos"};
        // let data = await res.json();
        ResetForm();
        GetRoles(urlGet);
    } catch (error) {
        console.log(error);
    }
}

GetRoles(urlGet);

// CREA LA TABLA DE EMPLEADOS
function CreateRolesTable(data)
{

    let namesFilterList = document.getElementById("name-filter-list");
    namesFilterList.innerHTML = "";

    let tableData = document.getElementById("tablebody");
    tableData.innerHTML = "";

    if (data.code === 0)
    {
        data.datos.forEach(element => {
            let lastRow = tableData.rows[tableData.rows - 1];

            let row = tableData.insertRow(lastRow);

            let i = 0;
            let col = null;
            for (const item in element) // element = usuario - item = campo
            {
                col = row.insertCell(i);
                col.innerHTML = element[item];
                i++;
            }

            // CREA EL ICONO PARA MODIFICAR EL USUARIO
            col = row.insertCell(row.cells.length);
            col.setAttribute("class", "material-symbols-rounded pointer");
            col.setAttribute("onclick", "UpdateRole("+element.id+")");
            let text = document.createTextNode("edit");
            col.appendChild(text);

            // CREA EL ICONO DE ELIMINAR USUARIO
            col = row.insertCell(row.cells.length);
            col.setAttribute("class", "material-symbols-rounded pointer");
            col.setAttribute("onclick", "OpenModal('DLT',"+element.id+")");
            text = document.createTextNode("close");
            col.appendChild(text);


            // RELLENA EL DATALIST DEL FILTRO "NOMBRE"
            let nameOption = document.createElement("option");
            nameOption.innerHTML = element.nombre + " " + element.apellidos;
            namesFilterList.appendChild(nameOption);

        });
    }
    else    // Si no hay datos muestra un mensaje en la tabla
    {
        let cols = document.getElementById("columnsTitles").rows[0].cells.length;   // retorna el numero de columnas (contando los th)
        let row = tableData.insertRow(0);
        let col = row.insertCell(0);
        col.setAttribute("colspan", cols);  // hace que la fila ocupe todo el ancho de la tabla
        col.style.textAlign = "center";
        col.innerHTML = data.descripcion;
    }
}

let insertForm = document.getElementById("workwith-roles");

insertForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // CAMPOS DEL FORMULARIO
    let formMode = document.getElementById("form-mode").value;
    let inputID  = document.getElementById("input-id").value;
    let campos = [
        document.getElementById("input-nombre"),
        document.getElementById("action-read"),
        document.getElementById("action-edit"),
        document.getElementById("action-delete")
    ];

    // ERRORES DE LOS CAMPOS
    let errores = [
        document.getElementById("error-nombre"),
        document.getElementById("error-read"),
        document.getElementById("error-edit"),
        document.getElementById("error-delete")
    ];

    let formData = ValidaCampos(campos, errores);
    if (formData.get("formValid") === "true")
    {
        formData.append("mode", formMode);
        if (inputID.value !== -1) formData.append("id", inputID); // SOLO PARA MODIFICAR

        campos.forEach(campo => {
            console.log(campo);
            if (campo.type === "checkbox")
            {
                console.log(campo.checked);
                let valor = (campo.checked) ? 1 : 0;
                formData.append(campo.name, valor);
            }else
                formData.append(campo.name, campo.value);
        });
        AlterRolesTable(formData);
    }
});


// RELLENA EL FORMULARIO CON LOS DATOS DEL EMPLEADO A MODIFICAR
function UpdateRole(id)
{
    if (id !== -1)
    {
        let data = allData.datos.filter((item) => item.id == id);

        // console.log(data);
        
        if (data.length > 0)
        {
            document.getElementById("submitForm").innerHTML     = "MODIFICAR";
            document.getElementById("form-mode").value          = "UPD";
            document.getElementById("input-id").value           = data[0].id || -1;
            document.getElementById("input-nombre").value       = data[0].nombre || "";
            document.getElementById("action-leer").value        = data[0].leer || "";
            document.getElementById("action-editar").value      = data[0].editar || "";
            document.getElementById("action-eliminar").value    = data[0].eliminar|| "";

            window.location.href = "#"+document.getElementById("workwith-roles").id;
        }
        else
        {
            console.log("No se encontró el elemento a modifica.");
        }
    }
}

// ELIMINA EL EMPLEADO SELECCIONADO
function DeleteRole(id)
{
    if (id !== -1)
    {
        window.location.href = urlAlter+"?mode=DLT&id="+id;
        GetRoles(urlGet);
    }
}


// FORMULARIO DE FILTROS
let filtersForm = document.getElementById("form-filters");
filtersForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let filters = url = "";

    let formInputs = filtersForm.querySelectorAll("input");
    formInputs.forEach(input => {
        if (input.value.length > 0) filters += input.name + '=' + input.value;
    })

    if (filters.length > 0)
    {
        url = urlGet+'?'+filters;
        GetRoles(url);
    }
    else{
        GetRoles(urlGet);
    }
})
